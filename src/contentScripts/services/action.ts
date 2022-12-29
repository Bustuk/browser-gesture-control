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
    const player = this.getPlayer()
    if (player) {
      player.play()
    }
  }

  pause() {
    const player = this.getPlayer()
    if (player) {
      player.pause()
    }
  }

  getPlayer() {
    const players = document.querySelectorAll('video');
    if (players.length === 0) {
      return undefined
    }
    //single player, no problems
    if (players.length === 1) {
      return players[0]
    } 
    const customPlayer = this.getCustomPlayer();
    // @todo implement custom handlers for specific pages
    return customPlayer ? customPlayer : undefined;
  }

  getCustomPlayer() {
    // @todo move to separate helper class
    if (location.href.includes('primevideo')) {
      const players = document.querySelectorAll('video');
      if (players.length === 2) {
        return players[0]
      }
    }
    return undefined;
  }
}