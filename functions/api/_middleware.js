const cookieName = "ab-test-homepage"
const newHomepagePathName = "/test"

const abtest = async ({ request, next, env }) => {
  const url = new URL(request.url)

  // if homepage
  if (url.pathname === "/") {
    // if cookie ab-test-hp=new
    // if no cookie set, pass xy% of traffic and set a cookie value (current|new)
    
    let cookie = request.headers.get("cookie")
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}`)) {
      if (cookie.includes(`${cookieName}=new`)) {
        // pass the request to /new-homepage
        url.pathname = newHomepagePathName
        return env.ASSETS.fetch(url)
      }
    } else {
      const perc = Math.floor(Math.random() * 100)
      let version = "current" // default version

      // change pathname and version name for traffic less than 50% 
      if (perc < 50) {
        url.pathname = newHomepagePathName
        version = "new"
      }

      // get the static file from ASSETS, and attach a cookie
      const asset = await env.ASSETS.fetch(url)
      let response = new Response(asset.body, asset)
      response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`)
      return response
    }
  }

  return next()
};

export const onRequest = [abtest];