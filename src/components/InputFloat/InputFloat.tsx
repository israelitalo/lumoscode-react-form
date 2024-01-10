import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { useCallback, useEffect, useState } from 'react';

export interface InputFloatProps extends Omit<TextFieldProps, 'label' | 'value' | 'onChange'> {
  /**
   * Valor exibido no label do input.
   */
  label?: string;
  /**
   * Usar o toFixed na string do value do input, após evento onBlur
   ** Default: true
   */
  toFixedOnBlur?: boolean;
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
  value: number | undefined;
  /**
   * Função callback que retorna o valor digitado no input, no formato float
   */
  onChange: (_value: number | undefined) => void;
  /**
   * Definir step recebida pelo input
   */
  step?: string;
}

const InputFloat: React.FC<InputFloatProps> = (props): React.ReactElement<number | undefined> => {
  const {
    value,
    onChange,
    label,
    toFixedOnBlur = true,
    onBlur,
    startAdornment,
    endAdornment,
    step = '0.01',
    ...rest
  } = props;

  const [localValue, setLocalValue] = useState<string>(value !== undefined ? String(value) : '');

  useEffect(() => {
    // Quando o valor externo (value) muda, atualizamos o valor local
    setLocalValue(value !== undefined ? String(value) : '');
  }, [value]);

  //Necessário apra, caso o componente seja montado com valores com mais de duas casas decimais, fazer o arredondamento para duas casas decimais
  useEffect(() => {
    setLocalValue(value !== undefined ? value?.toFixed(2) : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const newValue = event?.target?.value;
      const cleanedValue = newValue?.replace(/[^0-9,.]/g, '');
      // Substitui a vírgula por ponto para que o JavaScript interprete como um número válido
      const formattedValue = cleanedValue?.replace(',', '.');

      setLocalValue(formattedValue);

      const floatValue = parseFloat(cleanedValue);
      onChange(isNaN(floatValue) ? undefined : floatValue); // Chama o callback onChange com o novo valor numérico
    },
    [onChange],
  );

  return (
    <TextField
      {...rest}
      value={localValue}
      onChange={handleChange}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e);
        }
        toFixedOnBlur && localValue && setLocalValue((localValue) => Number(localValue)?.toFixed(2));
      }}
      label={label}
      type="number"
      InputProps={{
        startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined,
        endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : undefined,
      }}
      inputProps={{
        step,
      }}
    />
  );
};

export default InputFloat;
