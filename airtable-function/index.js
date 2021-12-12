addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */

const FORM_URL = 'https://egghead-cloudflare-pages-site.pages.dev'



const HandleAirtableData = body => {
  return fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-type': `application/json`
    }
  }
  )
  
}

async function submitHandler(request){

  if(request.method !== "POST"){
    return new Response("Method not allowed", {
      status:405
    })
  }
  const body = await request.formData()
  
  const {
    first_name,
    last_name,
    email,
    phone,
    subject,
    message} = Object.fromEntries(body)

    const reqBody ={
      fields:{
      "First Name": first_name,
      "Last Name": last_name,
      "Email": email,
      "Phone number": phone,
      "Subject": subject,
      "Message": message
      }
    }

    return HandleAirtableData(reqBody)
  // return Response.redirect(FORM_URL)
}

async function handleRequest(request) {
  const url = new URL(request.url)

  if (url.pathname === "/submit") {
    return submitHandler(request)
  }

  return new Response.redirect(FORM_URL)
}

