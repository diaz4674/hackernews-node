# Migration `20201024105743-link-test`

This migration has been generated at 10/24/2020, 3:57:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Link" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"description" text   NOT NULL ,
"url" text   NOT NULL ,
PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201024105743-link-test
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource db {
+    provider = "postgresql"
+    url = "***"
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
+
+model Link {
+    id          Int      @id @default(autoincrement())
+    createdAt   DateTime @default(now())
+    description String
+    url         String
+}
```


