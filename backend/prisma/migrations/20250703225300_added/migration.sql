-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "img2" VARCHAR(255),
ADD COLUMN     "img3" VARCHAR(255),
ALTER COLUMN "img" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "backgroudPic" VARCHAR(255) DEFAULT 'default.jpg';
