/// <reference types="nativewind/types" />

// Esta parte estava faltando:
// Ela diz ao TypeScript: "Ei, se você vir um
// arquivo terminando em .css, trate-o como um módulo!"
declare module '*.css' {
  const content: string;
  export default content;
}
