import '../css/InputText.css'
function Select({id, label="", required=true, onChange, rtl=true, list=[], ref=null, value=""}) {

    return (
        <div className='input-text'>
            <label htmlFor={id}>{label}</label>
            <select id={id}  required={required} value={value} ref={ref} onChange={onChange} style={{direction:rtl?'rtl':'ltr'}}>
                {
                    list.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                }
            </select>
        </div>
    )
}

export default Select