import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', {
  id: serial('id').primaryKey(),
  courseID: varchar('courseID').notNull(),
  subject: varchar('subject').notNull(),
  theme: varchar('theme').notNull(),
  difficulty: varchar('difficulty').notNull(),
  includeVideo: varchar('includeVideo').notNull().default('ja'),
  courseOutput: json('courseOutput').notNull(),
  createdBy: varchar('createdBy').notNull(),
  userName: varchar('userName'),
  userProfileImage: varchar('userProfileImage'),
  courseBanner: varchar('courseBanner').default('/placeholder.png'),
  published: boolean('published').default(false)
})

export const Chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseID: varchar('courseID').notNull(),
  chapterID: integer('chapterID').notNull(),
  content: json('content').notNull(),
  videoID: varchar('videoID').notNull(),
})
