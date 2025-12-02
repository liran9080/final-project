import { log } from 'console';
import fs, { write } from 'fs'

const writeDatabase = () => {
    fs.writeFile('./data.json', JSON.stringify(db), (err) => {
        if (err) {
            console.log("error saing db", err);
        }
    })
}
const readDatabase = () => {
    fs.readFile('./data.json',  'utf8',(err, data) => {
        if (err) {
            console.log("error saing db", err);
            return;
        }
        // console.log(data);
        
        const dbData = JSON.parse(data)
        for(const key in data){
            db[key] = dbData[key]
        }
        console.log("**************");
        // console.log(db);
        
        
    })
}
const save = () => {
    process.nextTick(writeDatabase)
}
const load = () => {
    process.nextTick(readDatabase)
}

const db = {
    categories: [
        { id: 1, name: 'דיור' },
        { id: 2, name: 'בריאות' },
        { id: 3, name: 'השכלה' }
    ],
    benefits: [
        { id: 1, categoryId: 1, title: 'זכות א', description: 'פרטי הזכות דיור ורשימת נותני שירות' },
        { id: 2, categoryId: 1, title: 'זכות ב', description: 'פרטי הזכות דיור ורשימת נותני שירות' },
        { id: 3, categoryId: 1, title: 'זכות ג', description: 'פרטי הזכות דיור ורשימת נותני שירות' },
        { id: 4, categoryId: 2, title: 'זכות א', description: 'פרטי הזכות בריאות ורשימת נותני שירות' },
        { id: 5, categoryId: 2, title: 'זכות ב', description: 'פרטי הזכות בריאות ורשימת נותני שירות' },
        { id: 6, categoryId: 2, title: 'זכות ג', description: 'פרטי הזכות בריאות ורשימת נותני שירות' },
        { id: 7, categoryId: 3, title: 'זכות א', description: 'פרטי הזכות לימודים ורשימת נותני שירות' },
        { id: 8, categoryId: 3, title: 'זכות ב', description: 'פרטי הזכות לימודים ורשימת נותני שירות' },
        { id: 9, categoryId: 3, title: 'זכות ג', description: 'פרטי הזכות לימודים ורשימת נותני שירות' },
    ],
    foundations: [
        { id: 1, categoryId: 1, name: 'עלה', area: 'צפון', address: 'השלוש 2, תל אביב', phone: '031234567', email: 'aleh@mail.com', description: 'תיאור' },
        { id: 2, categoryId: 1, name: 'עלה', area: 'צפון', address: 'השלוש 2, תל אביב', phone: '031234567', email: 'aleh@mail.com', description: 'תיאור' },
        { id: 3, categoryId: 2, name: 'עלה', area: 'צפון', address: 'השלוש 2, תל אביב', phone: '031234567', email: 'aleh@mail.com', description: 'תיאור' },
        { id: 4, categoryId: 2, name: 'עלה', area: 'צפון', address: 'השלוש 2, תל אביב', phone: '031234567', email: 'aleh@mail.com', description: 'תיאור' },
        { id: 5, categoryId: 3, name: 'עלה', area: 'צפון', address: 'השלוש 2, תל אביב', phone: '031234567', email: 'aleh@mail.com', description: 'תיאור' },
        { id: 6, categoryId: 3, name: 'עלה', area: 'צפון', address: 'השלוש 2, תל אביב', phone: '031234567', email: 'aleh@mail.com', description: 'תיאור' },
        { id: 7, categoryId: 1, name: 'אשנב', area: 'דרום', address: 'רחוב מנחם בגין 116 תל אביב', phone: '0524058887', email: 'info@eshnav-ltd.co.il', description: "מכינה ללימודים גבוהים" },
        { id: 8, categoryId: 2, name: 'אשנב', area: 'דרום', address: 'רחוב מנחם בגין 116 תל אביב', phone: '0524058887', email: 'info@eshnav-ltd.co.il', description: "מכינה ללימודים גבוהים" },
        { id: 9, categoryId: 3, name: 'אשנב', area: 'דרום', address: 'רחוב מנחם בגין 116 תל אביב', phone: '0524058887', email: 'info@eshnav-ltd.co.il', description: "מכינה ללימודים גבוהים" },
    ],
    comments: [
        { id: 1, foundationId: 1, userId: 2, createdDate: '2025-08-13', text: 'נראה לי בסדר גמור' },
        { id: 2, foundationId: 2, userId: 2, createdDate: '2025-08-13', text: 'נראה לי בסדר גמור' },
        { id: 3, foundationId: 2, userId: 1, createdDate: '2025-08-13', text: 'נראה לי בסדר גמור' },
    ],
    users: [
        { id: 1, fullName: 'Avi cohen', email: 'avic@mail.com', password: '123456', isAdmin: false },
        { id: 2, fullName: 'Dana Levi', email: 'danal@mail.com', password: '123456', isAdmin: false },
        { id: 3, fullName: 'Asaf Shamir', email: 'ashamir@mail.com', password: '123456', isAdmin: true },
    ]
}
load();
// save();
export default { db, save, load}