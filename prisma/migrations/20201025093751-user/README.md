# Migration `20201025093751-user`

This migration has been generated at 10/25/2020, 2:37:51 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Link" ADD COLUMN "postedById" integer   

CREATE TABLE "public"."User" (
"id" SERIAL,
"name" text   NOT NULL ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Link" ADD FOREIGN KEY ("postedById")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201024105743-link-test..20201025093751-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,25 +1,25 @@
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
 }
-model User {
-    id       Int    @id @default(autoincrement())
-    name     String
-    email    String @unique
-    password String
-    links    Link[]
-}
-
 model Link {
     id          Int      @id @default(autoincrement())
     createdAt   DateTime @default(now())
     description String
     url         String
     postedBy    User?    @relation(fields: [postedById], references: [id])
     postedById  Int?
 }
+
+model User {
+    id       Int    @id @default(autoincrement())
+    name     String
+    email    String @unique
+    password String
+    links    Link[]
+}
```


