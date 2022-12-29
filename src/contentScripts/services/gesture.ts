import type ActionService from './action'

type ActionThresholds = {
  [k: string]: {
    threshold: number,
    action: actionType,
  }
}

export default class Gesture {
  public mappedActions: ActionThresholds = {}
  constructor(
    private mappedGestures: mappedGesture[],
    private actionService: ActionService
  ) {
    this.mappedGestures = mappedGestures
    this.actionService = actionService
    this.mappedGestures.forEach((gesture) => {
      this.mappedActions[gesture.gesture] = {
        threshold: gesture.settings.accuracy || 0.8,
        action: gesture.action,
      }
    })
    
  }

  run({ value, probability}: { value: string, probability: number}) {
    if (!this.mappedActions[value]) {
      console.warn('Not mapped gesture', value)
      return
    } 
    if (probability > (this.mappedActions[value].threshold || 95) / 100) {
      this.actionService.execute(this.mappedActions[value].action)
    }
  }
}