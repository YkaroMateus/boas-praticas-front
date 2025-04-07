# 📘 Manual Técnico de Boas Práticas  
### Vite + MUI + TypeScript

Este manual contém diretrizes técnicas importantes para manter seu projeto limpo, performático e compatível com o comportamento esperado do Vite, especialmente durante o desenvolvimento com Hot Module Replacement (HMR).

---

## 1. ✅ Modelo de exportação ideal para Vite (Fresh Restart + HMR)

⚠️ **Evite encapsular componentes com funções (ex: `createComponent`) ou usar `export function`.**

### ❌ Ruim:
```ts
export function createMyComponent() {
  return () => <div>Hello</div>;
}
```

```ts
import { createMyComponent } from '@/components/MyComponent';
const MyComponent = createMyComponent(); // ❌ quebra o HMR
```

### ✅ Bom:
```ts
const MyComponent = () => <div>Hello</div>;
export default MyComponent;
```

```ts
import MyComponent from '@/components/MyComponent'; // ✅ HMR funcional
```

### 🔍 Por quê?
- O Vite rastreia **default exports estáticos** para aplicar HMR corretamente.
- Exportações dinâmicas ou funções de fábrica (factory functions) quebram o rastreio do Vite.
- Pode causar **refresh incompleto**, **estado inconsistente** ou **falha ao atualizar componentes**.

---

## 2. ✅ Estilizações com `styled` do MUI em arquivo separado (`styles.ts`)

### ❌ Ruim:
```tsx
<Box sx={{ padding: '20px', backgroundColor: 'white' }}>Texto</Box>
```

### ✅ Bom:
```ts
// styles.ts
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Container = styled(Box)`
  padding: 20px;
  background-color: white;
`;
```

```tsx
// MyComponent.tsx
import { Container } from './styles';

const MyComponent = () => <Container>Texto</Container>;
```

### 🔍 Por quê?
- Separar estilo evita **recriação de objetos** a cada render.
- Permite **memoização**, melhora performance e legibilidade.
- Facilita testes, manutenção e reuso dos estilos.

---

## 3. ✅ Tipagem com `types` ou `interfaces`

### ❌ Ruim:
```tsx
const MyComponent = (props: any) => {
  return <div>{props.title}</div>;
};
```

### ✅ Bom:
```ts
interface Props {
  title: string;
}

const MyComponent = ({ title }: Props) => <div>{title}</div>;
```

### 🔍 Por quê?
- Tipagens fornecem **autocompletar**, **validação** e **segurança**.
- `any` desativa os benefícios do TypeScript.
- Melhora documentação do código e evita erros em tempo de execução.

---

## 4. ✅ Importações modulares do MUI

### ❌ Ruim:
```ts
import { Button, Typography } from '@mui/material';
```

### ✅ Bom:
```ts
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
```

### 🔍 Por quê?
- Evita carregar o bundle completo do MUI.
- Garante que o **tree-shaking** funcione corretamente.
- Reduz o **tamanho final do bundle** (`.gz` / `.br`).

---

## 5. ✅ Importações individuais de ícones MUI

### ❌ Ruim:
```ts
import { Delete, Edit } from '@mui/icons-material';
```

### ✅ Bom:
```ts
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
```

### 🔍 Por quê?
- Importações agrupadas carregam **toda a biblioteca de ícones**.
- Ícones em SVG podem pesar **centenas de KBs**.
- Impacta diretamente no **tempo de carregamento** da aplicação.

---

## 6. ✅ Nada de `console.log()` ou código comentado em PR

### ❌ Ruim:
```ts
// console.log('Debugando aqui')
// const isTesting = true;
```

### ✅ Bom:
```ts
// ✅ Código limpo e pronto para produção
```

### 🔍 Por quê?
- `console.log` em produção pode vazar **informações sensíveis**.
- Comentários esquecidos atrapalham manutenção.
- Prejudica revisões e aumenta ruído no PR.

---

## 7. ✅ Cuidados com `useEffect` e suas dependências

### ❌ Ruim:
```ts
useEffect(() => {
  fetchData();
}, []);
```

### ✅ Bom:
```ts
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    await getData({ signal: controller.signal });
  };

  fetchData();

  return () => {
    controller.abort(); // limpa requisições pendentes
  };
}, [getData]);
```

### 🔍 Por quê?
- `useEffect` sem `return` pode causar **memory leaks**.
- Dependências mal definidas causam **renderizações desnecessárias**.
- Evite **closures desatualizadas** (stale closures).

---

📌 **Dica extra:** Use sempre `eslint-plugin-react-hooks` e `react-refresh` para te ajudar a manter tudo sob controle durante o desenvolvimento.

---

🚀 Mantenha seu projeto organizado, performático e preparado para escalar!
