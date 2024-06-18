import moment from 'moment'

export const colors = [
  '#7ecadf',
  '#eacf9a',
  '#d27e7e',
  '#40477c',
  '#4e1812',
  '#8fecfb'	,
  '#214174'	,
  '#b05900'	,
  '#5c704b'	,
  '#534b3f'	
]

export const customerColors = [
  '#8bbdff',
  '#ffc3f7',
  '#b06aae',
  '#8affa0',
  '#f28482'
]

export const dates = {
  daily: moment().subtract(1, 'days'),
  weekly: moment().subtract(7, 'days'),
  monthly: moment().subtract(1, 'months')
}