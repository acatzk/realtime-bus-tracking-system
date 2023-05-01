import React, { FC } from 'react'
import classNames from 'classnames'
import { X, AlertCircle, Info, Check } from 'react-feather'

type Props = {
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
}

const Alert: FC<Props> = ({ message, type }): JSX.Element => {
  let containerStyle = ''
  let textStyle = ''

  switch (type) {
    case 'success':
      containerStyle = 'border-green-400 bg-green-50'
      textStyle = 'text-green-500'
      break
    case 'error':
      containerStyle = 'border-rose-400 bg-rose-50'
      textStyle = 'text-rose-500'
      break
    case 'warning':
      containerStyle = 'border-amber-400 bg-amber-50'
      textStyle = 'text-amber-500'
      break
    case 'info':
      containerStyle = 'border-sky-400 bg-sky-50'
      textStyle = 'text-sky-500'
      break
    default:
      containerStyle = 'border-sky-400 bg-sky-50'
      textStyle = 'text-sky-500'
  }

  const IconType = (
    <>
      {type === 'error' && (
        <X className="bg-rose-500 absolute left-4 h-4 w-4 rounded-full p-0.5 text-white" />
      )}
      {type === 'warning' && (
        <AlertCircle className="bg-amber-500 absolute left-4 h-4 w-4 rounded-full p-0.5 text-white" />
      )}
      {type === 'info' && (
        <Info className="bg-sky-500 absolute left-4 h-4 w-4 rounded-full p-0.5 text-white" />
      )}
      {type === 'success' && (
        <Check className="absolute left-4 h-4 w-4 rounded-full bg-green-500 p-0.5 text-white" />
      )}
    </>
  )

  return (
    <div
      className={classNames(
        'relative flex items-center justify-center',
        'shadow-slate-200 rounded-md border py-2.5 px-4 shadow-md',
        containerStyle
      )}>
      {IconType}
      <p className={classNames('text-base font-medium', textStyle)}>{message}</p>
    </div>
  )
}

Alert.defaultProps = {
  type: 'info',
  message: 'Something went wrong'
}

export default Alert
