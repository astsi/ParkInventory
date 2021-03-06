// <auto-generated />
using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Backend.Migrations
{
    [DbContext(typeof(ParkInventoryContext))]
    partial class ParkInventoryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Backend.Models.City", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("date")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Date");

                    b.Property<string>("name")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("Name");

                    b.HasKey("id");

                    b.ToTable("City");
                });

            modelBuilder.Entity("Backend.Models.InventoryItem", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<int>("num")
                        .HasColumnType("int")
                        .HasColumnName("Num");

                    b.Property<int?>("parkID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("parkID");

                    b.ToTable("InventoryItem");
                });

            modelBuilder.Entity("Backend.Models.Park", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("cityid")
                        .HasColumnType("int");

                    b.Property<int>("greenArea")
                        .HasColumnType("int")
                        .HasColumnName("GreenArea");

                    b.Property<string>("location")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Location");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.HasKey("ID");

                    b.HasIndex("cityid");

                    b.ToTable("Park");
                });

            modelBuilder.Entity("Backend.Models.InventoryItem", b =>
                {
                    b.HasOne("Backend.Models.Park", "park")
                        .WithMany("inventoryList")
                        .HasForeignKey("parkID");

                    b.Navigation("park");
                });

            modelBuilder.Entity("Backend.Models.Park", b =>
                {
                    b.HasOne("Backend.Models.City", "city")
                        .WithMany("parkList")
                        .HasForeignKey("cityid");

                    b.Navigation("city");
                });

            modelBuilder.Entity("Backend.Models.City", b =>
                {
                    b.Navigation("parkList");
                });

            modelBuilder.Entity("Backend.Models.Park", b =>
                {
                    b.Navigation("inventoryList");
                });
#pragma warning restore 612, 618
        }
    }
}
