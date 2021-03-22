﻿// <auto-generated />
using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Backend.Migrations
{
    [DbContext(typeof(ParkInventoryContext))]
    [Migration("20210322215923_V3")]
    partial class V3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("name")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Name");

                    b.Property<int>("year")
                        .HasColumnType("int")
                        .HasColumnName("Year");

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

                    b.Property<int>("amount")
                        .HasColumnType("int")
                        .HasColumnName("Amount");

                    b.Property<string>("image")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Image");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

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

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.Property<int>("sqMeters")
                        .HasColumnType("int")
                        .HasColumnName("SqMeters");

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
