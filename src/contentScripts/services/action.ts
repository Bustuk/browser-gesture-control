type actionSettings = {
  [key in actionType]?: {
    sensitivity: number,
  }
}

export default class Action {
  public actionSettings: actionSettings = {}
  constructor(
    public mappedGestures: mappedGesture[],
  ) {
    this.mappedGestures = mappedGestures
    this.mappedGestures.forEach((gesture) => {
      this.actionSettings[gesture.action] = {
        sensitivity: gesture.settings.sensitivity || 0.5,
      }
    })
    
  }

  execute(action: actionType) {
    if (this[action]) {
      this[action]((this.actionSettings[action]?.sensitivity || 50) / 100)
    }
  }

  scroll(direction: 'up' | 'down', sensitivity: number) {
    window.scrollBy({
      top: 270 * sensitivity * (direction === 'up' ? -1 : 1),
      behavior: 'smooth',
    })
  }

  scrollDown(sensitivity: number) {
    this.scroll('down', sensitivity)
  }

  scrollUp(sensitivity: number) {
    this.scroll('up', sensitivity)
  }

  play() {
    // TODO: play video
  }

  pause() {
    // TODO: pause video
  }
}