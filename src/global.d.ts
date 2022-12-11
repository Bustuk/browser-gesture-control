declare const __DEV__: boolean

declare module '*.vue' {
  const component: any
  export default component
}

interface mappedGesture {
  action: string
  gesture: string
  settings: Record<string, any>
}
