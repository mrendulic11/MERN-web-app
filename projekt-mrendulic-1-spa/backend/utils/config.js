require('dotenv').config()

const PORT = process.env.PORT
const password = process.env.ATLAS_PASS
const user=process.env.ATLAS_USER
console.groupCollapsed(password)

/* inace nije dobro da koristimo istu bazu i za testiranje, pa uzimamo ovako: */
const dbname = process.env.NODE_ENV === 'test'
? 'proizvodi-api-test'   /* proizvodi-api-test */
: 'proizvodi-api'

/* za vjezbu koristimo istu bazu za testiranje */
/* const dbname = process.env.NODE_ENV === 'test'
? 'proizvodi-api'
: 'proizvodi-api' */

const url= `mongodb+srv://${user}:${password}@cluster0.mihin.mongodb.net/${dbname}?retryWrites=true&w=majority`

	
module.exports = {PORT, url}