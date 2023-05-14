import React, { useCallback, type ChangeEvent, type FC, type InputHTMLAttributes, useMemo, memo, useEffect } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'>

interface InputProps extends HTMLInputProps {
  placeholder: string
  name?: string
  className?: string
  value?: string | number
  type?: 'text' | 'email' | 'number' | 'password' | 'number' | 'tel'
  error?: string
  onChange?: (value: string) => void
  onChangeFormik?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = memo(({
  placeholder,
  name,
  className,
  value,
  error,
  onChange,
  onChangeFormik,
  type = 'text',
  ...props
}) => {
  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }, [onChange])

  const onChangeFunction = useMemo(() => {
    return onChange ? onChangeHandler : onChangeFormik
  }, [onChangeHandler, onChangeFormik])

  return (
    <div className='flex flex-col gap-1'>
      <input 
        type={type}
        value={value}
        name={name}
        className={`w-full px-5 py-3 outline-none transition-colors border border-black rounded-[5px] disabled:bg-gray-200 ${error ? ' border-red-500 text-red-500' : '' } ${className ? className : ''}`}
        onChange={onChangeFunction}
        placeholder={placeholder}
        autoComplete="off"
        {...props}
      />
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  )
})
