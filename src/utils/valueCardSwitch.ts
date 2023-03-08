export function valueCardSwitch(value: number | string) {
  switch (value) {
    case 'JACK': return 10
    case 'ACE': return 0
    default: return value
  }
}
