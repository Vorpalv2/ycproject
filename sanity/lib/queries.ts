import {defineQuery} from "groq";

export const Startups_Query =
defineQuery(`*[_type=="startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search  ]|order(_createdAt desc)
{
  _id,
  title,
  slug,
  _createdAt,
  author->{_id,image,name,bio},
   views,
   description,
   category,
   image
}`)

export const Startup_Query_By_ID = defineQuery(`*[_type == 'startup'&& _id ==$id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author->{_id,image,name,username},
   views,
   description,
   category,
   image,
   pitch
}`)

export const Startup_Query_For_Views = defineQuery(`*[_type == 'startup'&& _id ==$id][0]{
    _id,views
}`)

export const Author_By_Github_ID_Query = defineQuery(
    `*[_type == 'author'&& id ==$id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}`)

export const Author_By_ID_Query = defineQuery(
    `*[_type == 'author'&& _id ==$id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}`)
export const Startups_By_Author =
    defineQuery(`*[_type=="startup" && author._ref == $id] |order(_createdAt desc)
{
  _id,
  title,
  slug,
  _createdAt,
  author->{_id,image,name,bio},
   views,
   description,
   category,
   image
}`)

export const PLAYLIST_BY_SLUG_QUERY =
    defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio,
      email
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);