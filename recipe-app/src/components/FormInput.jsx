export function FormInput({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  required=false,
  disabled
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input 
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required ? true : false}
      />
    </>
  )
}