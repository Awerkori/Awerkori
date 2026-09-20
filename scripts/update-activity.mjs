const query = `query($login:String!){user(login:$login){contributionsCollection {contributionCalendar {totalContributions weeks {contributionDays {date contributionCount}}}}}}`;
const response = await fetch('https://api.github.com/graphql', {method:'POST', headers:{Authorization:`Bearer ${process.env.GH_TOKEN}`, 'Content-Type':'application/json'}, body:JSON.stringify({query,variables:{login:'Awerkori'}})});
if (!response.ok) throw new Error(`GitHub API ${response.status}`);
const json = await response.json();
if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join('; '));
const calendar = json.data.user.contributionsCollection.contributionCalendar;
const days = calendar.weeks.flatMap(w => w.contributionDays);
await import('node:fs/promises').then(fs => fs.writeFile('assets/profile/activity.json', JSON.stringify({updatedAt:new Date().toISOString(), total:calendar.totalContributions, days}, null, 2)+'\n'));
