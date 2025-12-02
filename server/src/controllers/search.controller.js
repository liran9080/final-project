import foundationService from "../services/foundation.service.js";
import benefotService from "../services/benefits.service.js";
const searchText = async (req, res) => {
    const { q, geo } = req.query;
    // רק אם הפרמטר שייך למשתמש הנוכחי
    // Housing
    // q=housing
    const lowCase = q.toLowerCase()
    try {
        const foundations = await foundationService.searchFoundations(q, geo);
        const benefits = await benefotService.searchBenefits(q, geo);
        // const benefits = data.db.benefits.filter(b => b.title.toLowerCase().includes(lowCase) || b.description.toLowerCase().includes(lowCase))
        // const foundations = data.db.foundations.filter(f => geo == 'כל הארץ'?true : f.area==geo).filter(f => f.name.toLowerCase().includes(lowCase) || f.description.toLowerCase().includes(lowCase))

        res.json({ benefits, foundations });
    } catch (error) {
        console.log(error);
        
        res.status(500).send({ message: error.message })
    }

}
export default { searchText }