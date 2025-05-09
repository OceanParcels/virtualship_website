
import { getRootURL } from '@/lib/seo-utils';
import { Feed } from 'feed';
import fs from 'fs';


export async function generateRssFeed(allPostsData) {

    const siteUrl = getRootURL()
    const blogUrl = `${siteUrl}/blog`

const feed = new Feed({
    title: 'OceanParcels Blog Feed',
    description: 'The latest announcements and news from the Parcels team',
    id: blogUrl,
    link: blogUrl,
    language: 'en',
    image: `${siteUrl}/virtualship-assets/virtual_ship_logo_no-text.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()}, VirtualShip developers. Apache 2.0 Licensed`,
    feedLinks: {
        rss2: `${siteUrl}/rss.xml`,
        json: `${siteUrl}/rss.json`,
        atom: `${siteUrl}/atom.xml`
    },
})

    allPostsData.forEach(post => {
        feed.addItem({
            title: post.title,
            date: new Date(post.date),
            link: `${blogUrl}/${post.id}`,
            id: post.id,
            author: post.authors,
            description: post.description,
        })
    })



    fs.writeFileSync('./public/rss.xml', feed.rss2());
    fs.writeFileSync('./public/atom.xml', feed.atom1());
    fs.writeFileSync('./public/rss.json', feed.json1());

}
