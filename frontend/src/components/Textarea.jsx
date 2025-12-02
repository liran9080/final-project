import '../css/InputText.css'
function Textarea({id, value="", type="text", placeholder="", label="", required=true, onChange, rtl=true}) {

    return (
        <div className='input-text'>
            <label htmlFor={id}>{label}</label>
        
            <textarea type={type} id={id} value={value} placeholder={placeholder} required={required} onChange={onChange} style={{direction:rtl?'rtl':'ltr'}}></textarea>
        </div>
    )
}

export default Textarea