# lumoscode-react-form

Uma biblioteca react que disponibiliza alguns tipos de inputs customizados, feitos com **[MUI v5](https://mui.com/material-ui/getting-started/)**.

### 📋 Pré-requisitos

Você precisa ter as seguintes bibliotecas:
- **[MUI v5](https://mui.com/material-ui/getting-started/)**
- **[IMASK](https://www.npmjs.com/package/imask)**
- **[React-icons](https://www.npmjs.com/package/react-icons)**

## 🔧 Instalação

Para instalar, basta executar:

```
npm install lumoscode-react-form
ou
yarn add lumoscode-react-form
```

# 📦 Como usar

## InputText

Uso básico
```
import { InputText } from 'lumoscode-react-form';

const [cpf, setCpf] = useState<string>();

<InputText
  label="CPF"
  value={cpf}
  onChange={(value) => setCpf(value)}
/>
```

Com máscara

Máscaras podem ser string ou Regex
```
import { InputText } from 'lumoscode-react-form';

const [cpf, setCpf] = useState<string>();

<InputText
  mask="000.000.000-00" || mask={new RegExp(/^\d+$/)}
  unmaskedValue={false}
  label="CPF"
  value={cpf}
  onChange={(value) => setCpf(value)}
/>
```

Exemplo de uso com React-Hook-Form
```
<Controller
  name="cpf"
  control={control}
  render={({ field, fieldState }) => {
    return (
      <InputText
        fullWidth
        mask="000.000.000-00"
        label="CPF"
        type="text"
        error={Boolean(fieldState?.error)}
        helperText={fieldState?.error?.message}
      />
    );
  }}
/>
```
## 🛠️ InputText Props

|Prop|Required|type|Description|
|-----------|-----------|-----------|-----------|
|label|não|string|label do input|
|startAdornment|não|string/React.ReactNode|startAdornment do TextFild|
|endAdornment|não|string/React.ReactNode|endAdornment do TextFild|
|value|sim|string|valor do input|
|onChange|sim|function(v) => void|função callback que retorna o valor digitado no input|
|mask|não|string/RegExp|- 0 números, a - letras, \* - qualquer caractere **[IMASK](https://www.npmjs.com/package/imask)**|
|unmaskedValue|não|boolean|se true(default true), retorna o valor do input sem máscara: 000.000.000-00 => 00000000000|
|controlShowPassword|não|boolean|Se o type do input for password, exibe iconButton no endAdornment para alterar o tipo do input entre text/password|
|readOnly|não|boolean|tornar input readOnly|

#

## InputFloat

Uso básico
```
import { InputFloat } from 'lumoscode-react-form';

const [price, setPrice] = useState<number>(21.999);

<InputFloat
  label="Sem Hook-Form" 
  value={price} 
  onChange={(value) => setPrice(value)} 
/>
```

Exemplo de uso com React-Hook-Form
```
<Controller
  name="units"
  control={control}
  render={({ field, fieldState }) => (
    <InputFloat
      label="Quantidade"
      error={Boolean(fieldState?.error)}
      helperText={fieldState?.error?.message}
      startAdornment={<MoneyIcon size={20} />}
    />
  )}
/>
```

## 🛠️ InputFloat Props

|Prop|Required|type|Description|
|-----------|-----------|-----------|-----------|
|label|não|string|label do input|
|toFixedOnBlur|não|boolean|Usar o toFixed na string do value do input, após evento onBlur (default true)|
|startAdornment|não|string/React.ReactNode|startAdornment do TextFild|
|endAdornment|não|string/React.ReactNode|endAdornment do TextFild|
|value|sim|number|valor do input|
|onChange|sim|function(v) => void|função callback que retorna o valor digitado no input|
|step|não|string|Definir step recebida pelo input (default '0.01')|
|readOnly|não|boolean|tornar input readOnly|
#

## ✒️ Autor

* Desenvolvedor deste 2020 - **[Israel Silva](https://github.com/israelitalo)**