const HandleAirtableData = async function onRequest({ body, env }) {
	return fetch(
		`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(
			env.AIRTABLE_TABLE_NAME
		)}`,
		{
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
				'Content-type': `application/json`,
			},
		}
	);
};

async function submitHandler({ request, env }) {
	if (request.method !== 'POST') {
		return new Response('Method not allowed', {
			status: 405,
		});
	}
	const body = await request.formData();

	const { first_name, last_name, email, phone, subject, message } =
		Object.fromEntries(body);

	const reqBody = {
		fields: {
			'First Name': first_name,
			'Last Name': last_name,
			Email: email,
			'Phone number': phone,
			Subject: subject,
			Message: message,
		},
	};

	return HandleAirtableData({ body:reqBody,env:env });
	// return Response.redirect(FORM_URL)
}

export async function onRequestPost({ request, env }) {
	return await submitHandler({ request, env });
}
