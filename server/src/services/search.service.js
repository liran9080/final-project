import data from '../database.js'

const searchText = (req, res) => {
    const { q, geo } = req.query;
    // רק אם הפרמטר שייך למשתמש הנוכחי
    // Housing
    // q=housing
    const lowCase = q.toLowerCase()
    const benefits = data.db.benefits.filter(b => b.title.toLowerCase().includes(lowCase) || b.description.toLowerCase().includes(lowCase))
    const foundations = data.db.foundations.filter(f => geo == 'כל הארץ'?true : f.area==geo).filter(f => f.name.toLowerCase().includes(lowCase) || f.description.toLowerCase().includes(lowCase))

    res.json({benefits, foundations});
    
}


export default {searchText}