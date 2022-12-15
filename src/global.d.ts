declare const __DEV__: boolean

declare module '*.vue' {
  const component: any
  export default component
}

type actionType = 'scrollDown' | 'scrollUp' | 'play' | 'pause'
interface mappedGesture {
  action: actionType
  gesture: string
  settings: Record<string, any>
}
