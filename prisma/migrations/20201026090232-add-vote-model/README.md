# Migration `20201026090232-add-vote-model`

This migration has been generated at 10/26/2020, 2:02:32 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Vote.linkId_userId_unique" ON "public"."Vote"("linkId", "userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201026082410-add-vote-model..20201026090232-add-vote-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -31,5 +31,7 @@
     link   Link @relation(fields: [linkId], references: [id])
     linkId Int
     user   User @relation(fields: [userId], references: [id])
     userId Int
+
+    @@unique([linkId, userId])
 }
```


