import '../css/InputText.css'
function InputText({id,name=id, value="",type="text", checked, placeholder="", label="",  required=true, onChange, rtl=true, ref=null}) {

    return (
        <div className='input-text'>
            <label htmlFor={id}>{label}</label>
            <input autoComplete='false' type={type} id={id} name={name} checked={checked} value={ref?null:value} ref={ref} placeholder={placeholder} required={required} onChange={onChange} style={{direction:rtl?'rtl':'ltr'}}/>
        </div>
    )
}

export default InputText