import React, { useEffect, useState, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IMask from 'imask';
import { AiFillEye as OpenEyeIcon, AiFillEyeInvisible as ClosedEyeIcon } from 'react-icons/ai'
import { colors } from '../../theme/colors';

export interface InputTextProps extends Omit<TextFieldProps, 'label' | 'value' | 'onChange'> {
  /**
   * Valor exibido no label do input.
   */
  label?: string;
  /**
   * Será exibido no startAdornment do TextFild
   */
  startAdornment?: string | React.ReactNode;
  /**
   * Será exibido no endAdornment do TextFild
   */
  endAdornment?: string | React.ReactNode;
  /**
   * Valor externo do input
   */
  value: string | undefined;
  /**
   * Função callback que retorna o valor digitado no input
   */
  onChange: (_value: string | undefined) => void;
  /**
   * Máscara respeitando a biblioteca imask: https://imask.js.org/guide.html
   * @definições
   ** 0 - números
   ** a - letras
   ** \* - qualquer caractere
   */
  mask?: string | RegExp;
  /**
   * @mask unmaskedValue true retorna o valor do input sem máscara: 000.000.000-00 => 00000000000
   * @default true
   */
  unmaskedValue?: boolean;
  /**
   * Se o type do input for password, exibe iconButton no endAdornment para alterar o tipo do input entre text/password
   */
  controlShowPassword?: boolean;
  readOnly?: boolean;
}

const InputText: React.FC<InputTextProps> = (props) => {
  const {
    value,
    onChange,
    label,
    mask,
    unmaskedValue = true,
    startAdornment,
    endAdornment,
    type = 'text',
    controlShowPassword,
    readOnly = false,
    ...rest
  } = props;

  const [localValue, setLocalValue] = useState<string>(value !== undefined ? String(value) : '');
  const [inputType, setInputType] = useState<React.HTMLInputTypeAttribute>(type);

  const masked =
    mask != undefined && mask != null
      ? IMask.createMask({
          mask: mask as any,
        })
      : null;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event?.target?.value;
      if (mask && masked) {
        masked?.resolve(newValue);
        const resolvedValue = masked?.value;
        setLocalValue(resolvedValue);
        onChange(unmaskedValue ? masked.unmaskedValue : resolvedValue);
        return;
      }
      setLocalValue(newValue);
      onChange(newValue);
    },
    [mask, masked, onChange, unmaskedValue],
  );

  useEffect(() => {
    if (mask && masked) {
      if (localValue !== undefined) {
        masked?.resolve(localValue);
        setLocalValue(masked.value);
        onChange(unmaskedValue ? masked.unmaskedValue : masked.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unmaskedValue, localValue]);

  return (
    <TextField
      {...rest}
      value={localValue}
      label={label}
      type={inputType}
      onChange={(e) => {
        handleChange(e);
      }}
      InputProps={{
        readOnly,
        startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined,
        endAdornment:
          endAdornment || controlShowPassword ? (
            <InputAdornment position="end">
              {controlShowPassword && type == 'password' ? (
                <IconButton
                  size="small"
                  onClick={() => setInputType((oldType) => (oldType == 'password' ? 'text' : 'password'))}
                >
                  {inputType == 'password' ? (
                    <OpenEyeIcon color={colors.primary} />
                  ) : (
                    <ClosedEyeIcon color={colors.primary} />
                  )}
                </IconButton>
              ) : (
                endAdornment
              )}
            </InputAdornment>
          ) : undefined,
      }}
    />
  );
};

export default InputText;
