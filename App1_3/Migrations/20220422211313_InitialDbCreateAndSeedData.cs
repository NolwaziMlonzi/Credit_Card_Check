using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace App1_3.Migrations
{
    public partial class InitialDbCreateAndSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Coutries",
                columns: table => new
                {
                    ContryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CountryName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    flag = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coutries", x => x.ContryId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Coutries",
                columns: new[] { "ContryId", "CountryName", "flag" },
                values: new object[,]
                {
                    { 174, "Egypt", "https://flagcdn.com/w320/eg.png" },
                    { 8, "United States", "https://flagcdn.com/w320/us.png" },
                    { 148, "Greece", "https://flagcdn.com/w320/gr.png" },
                    { 96, "Iraq", "https://flagcdn.com/w320/iq.png" },
                    { 101, "Norway", "https://flagcdn.com/w320/no.png" },
                    { 73, "Panama", "https://flagcdn.com/w320/pa.png" },
                    { 141, "Benin", "https://flagcdn.com/w320/bj.png" },
                    { 160, "Pakistan", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png" },
                    { 54, "Iceland", "https://flagcdn.com/w320/is.png" },
                    { 16, "Uganda", "https://flagcdn.com/w320/ug.png" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coutries");
        }
    }
}
