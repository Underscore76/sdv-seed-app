using System;
using System.Collections.Generic;
using sdv_plugin.remixbundles;

namespace sdv_plugin.remixedbundles.v1_6;

public class RemixData : IRemixData
{
    public static List<RoomData> RoomConfigs;
    public override List<RoomData> Rooms => RoomConfigs;

    static RemixData()
    {
        Initialize();
    }

    public static void Initialize()
    {
        if (RoomConfigs != null) return;
        RoomConfigs =
        [
            CraftsRoom(),
            Pantry(),
            FishTank(),
            BoilerRoom(),
            BulletinBoard()
        ];
    }

    public override ICompressedRemixBundles NewResult()
    {
        return new CompressedResult(0);
    }

    public override UInt128 CollapseFlags(List<string> flags)
    {
        UInt128 result = new UInt128();
        foreach (var flag in flags)
        {
            var field = typeof(CompressedFlags).GetField(flag);
            if (field == null) throw new Exception("Invalid flag: " + flag);
            result |= (UInt128)field.GetValue(null);
        }
        return result;
    }

    private static RoomData CraftsRoom()
    {
        RoomData data = new RoomData("Crafts Room", true);
        data.optionalBundleGroups.Add(
            new()
            {
                id = "crafts-random-1",
                pick = 1,
                bundles =
                [
                    new("Construction", "CRAFTS_CONSTRUCTION", CompressedFlags.CRAFTS_CONSTRUCTION),
                    new("Sticky", "CRAFTS_STICKY", CompressedFlags.CRAFTS_STICKY),
                    new("Forest", "CRAFTS_FOREST", CompressedFlags.CRAFTS_FOREST)
                ]
            }
        );
        data.optionalBundleGroups.Add(
            new()
            {
                id = "crafts-random-2",
                pick = 1,
                bundles =
                [
                    new("Exotic Foraging", "CRAFTS_EXOTIC", CompressedFlags.CRAFTS_EXOTIC),
                    new("Wild Medicine", "CRAFTS_WILD_MEDICINE", CompressedFlags.CRAFTS_WILD_MEDICINE),
                ]
            }
        );
        data.defaultBundles.Add(
            new()
            {
                id = "crafts-spring-forage",
                optionGroups =
                [
                    new()
                    {
                        id = "crafts-spring-forage-1",
                        pick = 4,
                        options =
                        [
                            new("16", "CRAFTS_SPRING_FORAGE_WILD_HORSERADISH", CompressedFlags.CRAFTS_SPRING_FORAGE_WILD_HORSERADISH),
                            new("18", "CRAFTS_SPRING_FORAGE_DAFFODIL", CompressedFlags.CRAFTS_SPRING_FORAGE_DAFFODIL),
                            new("20", "CRAFTS_SPRING_FORAGE_LEEK", CompressedFlags.CRAFTS_SPRING_FORAGE_LEEK),
                            new("22", "CRAFTS_SPRING_FORAGE_DANDELION", CompressedFlags.CRAFTS_SPRING_FORAGE_DANDELION),
                            new("399", "CRAFTS_SPRING_FORAGE_SPRING_ONION", CompressedFlags.CRAFTS_SPRING_FORAGE_SPRING_ONION)
                        ]
                    }
                ]
            }
        );
        data.defaultBundles.Add(
            new()
            {
                id = "crafts-winter-forage",
                optionGroups =
                [
                    new()
                    {
                        id = "crafts-winter-forage-1",
                        pick = 4,
                        options =
                        [
                            new("412", "CRAFTS_WINTER_FORAGE_WINTER_ROOT", CompressedFlags.CRAFTS_WINTER_FORAGE_WINTER_ROOT),
                            new("414", "CRAFTS_WINTER_FORAGE_CRYSTAL_FRUIT", CompressedFlags.CRAFTS_WINTER_FORAGE_CRYSTAL_FRUIT),
                            new("416", "CRAFTS_WINTER_FORAGE_SNOW_YAM", CompressedFlags.CRAFTS_WINTER_FORAGE_SNOW_YAM),
                            new("418", "CRAFTS_WINTER_FORAGE_CROCUS", CompressedFlags.CRAFTS_WINTER_FORAGE_CROCUS),
                            new("283", "CRAFTS_WINTER_FORAGE_HOLLY", CompressedFlags.CRAFTS_WINTER_FORAGE_HOLLY)
                        ]
                    }
                ]
            }
        );
        return data;
    }

    private static RoomData Pantry()
    {
        RoomData data = new RoomData("Pantry", true);
        data.optionalBundleGroups.Add(
            new()
            {
                id = "pantry-random-1",
                pick = 1,
                bundles =
                [
                    new("Quality Crops", "PANTRY_QUALITY", CompressedFlags.PANTRY_QUALITY)
                    {
                        optionGroups =
                        [
                            new()
                            {
                                id = "pantry-quality-spring",
                                pick = 1,
                                options =
                                [
                                    new("24", "PANTRY_QUALITY_PARSNIP", CompressedFlags.PANTRY_QUALITY_PARSNIP),
                                    new("188", "PANTRY_QUALITY_GREEN_BEAN", CompressedFlags.PANTRY_QUALITY_GREEN_BEAN),
                                    new("190", "PANTRY_QUALITY_CAULIFLOWER", CompressedFlags.PANTRY_QUALITY_CAULIFLOWER),
                                    new("192", "PANTRY_QUALITY_POTATO", CompressedFlags.PANTRY_QUALITY_POTATO),
                                ]
                            },
                            new()
                            {
                                id = "pantry-quality-summer",
                                pick = 1,
                                options =
                                [
                                    new("254", "PANTRY_QUALITY_MELON", CompressedFlags.PANTRY_QUALITY_MELON),
                                    new("260", "PANTRY_QUALITY_HOT_PEPPER", CompressedFlags.PANTRY_QUALITY_HOT_PEPPER),
                                    new("258", "PANTRY_QUALITY_BLUEBERRY", CompressedFlags.PANTRY_QUALITY_BLUEBERRY),
                                ]
                            },
                            new()
                            {
                                id = "pantry-quality-fall",
                                pick = 1,
                                options =
                                [
                                    new("276", "PANTRY_QUALITY_PUMPKIN", CompressedFlags.PANTRY_QUALITY_PUMPKIN),
                                    new("272", "PANTRY_QUALITY_EGGPLANT", CompressedFlags.PANTRY_QUALITY_EGGPLANT),
                                    new("280", "PANTRY_QUALITY_YAM", CompressedFlags.PANTRY_QUALITY_YAM),
                                ]
                            },
                            new() // exists because corn is a solo selection but will trigger a random call
                            {
                                id = "pantry-quality-corn",
                                pick = 1,
                                options =
                                [
                                    new("270", null, 0),
                                ]
                            }
                        ]
                    },
                    new("Rare Crops", "PANTRY_RARE", CompressedFlags.PANTRY_RARE)
                ]
            }
        );
        data.optionalBundleGroups.Add(
            new()
            {
                id = "pantry-random-2",
                pick = 1,
                bundles = [
                    new("Animal", "PANTRY_ANIMAL", CompressedFlags.PANTRY_ANIMAL),
                    new("Fish Farmer's", "PANTRY_FISH_FARMER", CompressedFlags.PANTRY_FISH_FARMER),
                    new("Garden", "PANTRY_GARDEN", CompressedFlags.PANTRY_GARDEN)
                ]
            }
        );
        data.optionalBundleGroups.Add(
            new()
            {
                id = "pantry-random-3",
                pick = 1,
                bundles =
                [
                    new("Artisan", "PANTRY_ARTISAN", CompressedFlags.PANTRY_ARTISAN),
                    new("Brewer", "PANTRY_BREWER", CompressedFlags.PANTRY_BREWER)
                ]
            }
        );
        data.defaultBundles.Add(
            new()
            {
                id = "pantry-spring-crops",
                optionGroups = [
                    new()
                    {
                        id = "pantry-spring-crops-1",
                        pick = 4,
                        options = [
                            new("24", "PANTRY_SPRING_CROPS_PARSNIP", CompressedFlags.PANTRY_SPRING_CROPS_PARSNIP),
                            new("188", "PANTRY_SPRING_CROPS_GREEN_BEAN", CompressedFlags.PANTRY_SPRING_CROPS_GREEN_BEAN),
                            new("190", "PANTRY_SPRING_CROPS_CAULIFLOWER", CompressedFlags.PANTRY_SPRING_CROPS_CAULIFLOWER),
                            new("192", "PANTRY_SPRING_CROPS_POTATO", CompressedFlags.PANTRY_SPRING_CROPS_POTATO),
                            new("250", "PANTRY_SPRING_CROPS_KALE", CompressedFlags.PANTRY_SPRING_CROPS_KALE),
                            new("Carrot", "PANTRY_SPRING_CROPS_CARROT", CompressedFlags.PANTRY_SPRING_CROPS_CARROT)
                        ]
                    }
                ]
            }
        );
        data.defaultBundles.Add(
            new()
            {
                id = "pantry-summer-crops",
                optionGroups = [
                    new()
                    {
                        id = "pantry-summer-crops-1",
                        pick = 4,
                        options = [
                            new("256", "PANTRY_SUMMER_CROPS_TOMATO", CompressedFlags.PANTRY_SUMMER_CROPS_TOMATO),
                            new("260", "PANTRY_SUMMER_CROPS_HOT_PEPPER", CompressedFlags.PANTRY_SUMMER_CROPS_HOT_PEPPER),
                            new("258", "PANTRY_SUMMER_CROPS_BLUEBERRY", CompressedFlags.PANTRY_SUMMER_CROPS_BLUEBERRY),
                            new("254", "PANTRY_SUMMER_CROPS_MELON", CompressedFlags.PANTRY_SUMMER_CROPS_MELON),
                            new("SummerSquash", "PANTRY_SUMMER_CROPS_SUMMER_SQUASH", CompressedFlags.PANTRY_SUMMER_CROPS_SUMMER_SQUASH)
                        ]
                    }
                ]
            });
        data.defaultBundles.Add(
            new()
            {
                id = "pantry-fall-crops",
                optionGroups = [
                    new()
                    {
                        id = "pantry-fall-crops-1",
                        pick = 4,
                        options = [
                            new("270", "PANTRY_FALL_CROPS_CORN", CompressedFlags.PANTRY_FALL_CROPS_CORN),
                            new("272", "PANTRY_FALL_CROPS_EGGPLANT", CompressedFlags.PANTRY_FALL_CROPS_EGGPLANT),
                            new("276", "PANTRY_FALL_CROPS_PUMPKIN", CompressedFlags.PANTRY_FALL_CROPS_PUMPKIN),
                            new("80", "PANTRY_FALL_CROPS_YAM", CompressedFlags.PANTRY_FALL_CROPS_YAM),
                            new("Broccoli", "PANTRY_FALL_CROPS_BROCCOLI", CompressedFlags.PANTRY_FALL_CROPS_BROCCOLI)
                        ]
                    }
                ]
            }
        );
        return data;
    }

    private static RoomData FishTank()
    {
        RoomData data = new RoomData("Fish Tank", true);
        // note: this exists because CA put it in the bundles and not bundlesets block
        data.optionalBundleGroups.Add(
            new()
            {
                id = "fish-tank-random-1",
                pick = 1,
                bundles = [
                    new("Crab Pot", null, 0),
                ]
            }
        );
        data.optionalBundleGroups.Add(
            new()
            {
                id = "fish-tank-random-2",
                pick = 1,
                bundles = [
                    new("Specialty Fish", "FISH_SPECIALTY", CompressedFlags.FISH_SPECIALTY),
                    new("Quality Fish", "FISH_QUALITY", CompressedFlags.FISH_QUALITY),
                    new("Master Fisher's", "FISH_MASTER", CompressedFlags.FISH_MASTER)
                ]
            }
        );
        return data;
    }

    private static RoomData BoilerRoom()
    {
        RoomData data = new RoomData("Boiler Room", false);
        data.optionalBundleGroups.Add(
            new()
            {
                id = "boiler-room-random-1",
                pick = 3,
                bundles = [
                    new("Blacksmith's", "BOILER_BLACKSMITH", CompressedFlags.BOILER_BLACKSMITH),
                    new("Geologist's", "BOILER_GEOLOGIST", CompressedFlags.BOILER_GEOLOGIST),
                    new("Adventurer's", "BOILER_ADVENTURER", CompressedFlags.BOILER_ADVENTURER)
                    {
                        optionGroups = [
                            new()
                            {
                                id = "boiler-adventurer-slime",
                                pick = 4,
                                options = [
                                    new("766", "BOILER_ADVENTURER_SLIME", CompressedFlags.BOILER_ADVENTURER_SLIME),
                                    new("767", "BOILER_ADVENTURER_BAT_WING", CompressedFlags.BOILER_ADVENTURER_BAT_WING),
                                    new("768", "BOILER_ADVENTURER_SOLAR_ESSENCE", CompressedFlags.BOILER_ADVENTURER_SOLAR_ESSENCE),
                                    new("769", "BOILER_ADVENTURER_VOID_ESSENCE", CompressedFlags.BOILER_ADVENTURER_VOID_ESSENCE),
                                    new("881", "BOILER_ADVENTURER_BONE_FRAGMENTS", CompressedFlags.BOILER_ADVENTURER_BONE_FRAGMENTS),
                                ]
                            }
                        ]
                    },
                    new("Treasure Hunter's", "BOILER_TREASURE_HUNTER", CompressedFlags.BOILER_TREASURE_HUNTER),
                    new("Engineer's", "BOILER_ENGINEER", CompressedFlags.BOILER_ENGINEER)
                ]
            }
        );
        return data;
    }

    private static RoomData BulletinBoard()
    {
        RoomData data = new RoomData("Bulletin Board", false);
        data.optionalBundleGroups.Add(
            new()
            {
                id = "bulletin-board-random-1",
                pick = 5,
                bundles = [
                    new("Chef's", "BULLETIN_CHEF", CompressedFlags.BULLETIN_CHEF),
                    new("Dye", "BULLETIN_DYE", CompressedFlags.BULLETIN_DYE)
                    {
                        optionGroups = [
                            new(){
                                id = "bulletin-dye-red",
                                pick = 1,
                                options = [
                                    new("420", "BULLETIN_DYE_RED_MUSHROOM", CompressedFlags.BULLETIN_DYE_RED_MUSHROOM),
                                    new("284", "BULLETIN_DYE_BEET", CompressedFlags.BULLETIN_DYE_BEET)
                                ]
                            },
                            new(){
                                id = "bulletin-dye-purple",
                                pick = 1,
                                options = [
                                    new("397", "BULLETIN_DYE_SEA_URCHIN", CompressedFlags.BULLETIN_DYE_SEA_URCHIN),
                                    new("300", "BULLETIN_DYE_AMARANTH", CompressedFlags.BULLETIN_DYE_AMARANTH)
                                ]
                            },
                            new() {
                                id = "bulletin-dye-yellow",
                                pick = 1,
                                options = [
                                    new("421", "BULLETIN_DYE_SUNFLOWER", CompressedFlags.BULLETIN_DYE_SUNFLOWER),
                                    new("268", "BULLETIN_DYE_STARFRUIT", CompressedFlags.BULLETIN_DYE_STARFRUIT)
                                ]
                            },
                            new() {
                                id = "bulletin-dye-green",
                                pick = 1,
                                options = [
                                    new("444", "BULLETIN_DYE_DUCK_FEATHER", CompressedFlags.BULLETIN_DYE_DUCK_FEATHER),
                                    new("90", "BULLETIN_DYE_CACTUS_FRUIT", CompressedFlags.BULLETIN_DYE_CACTUS_FRUIT)
                                ]
                            },
                            new() {
                                id = "bulletin-dye-blue",
                                pick = 1,
                                options = [
                                    new("62", "BULLETIN_DYE_AQUAMARINE", CompressedFlags.BULLETIN_DYE_AQUAMARINE),
                                    new("258", "BULLETIN_DYE_BLUEBERRY", CompressedFlags.BULLETIN_DYE_BLUEBERRY)
                                ]
                            },
                            new() {
                                id = "bulletin-dye-pink",
                                pick = 1,
                                options = [
                                    new("266", "BULLETIN_DYE_RED_CABBAGE", CompressedFlags.BULLETIN_DYE_RED_CABBAGE),
                                    new("337", "BULLETIN_DYE_IRIDIUM_BAR", CompressedFlags.BULLETIN_DYE_IRIDIUM_BAR)
                                ]
                            }
                        ]
                    },
                    new("Field Research", "BULLETIN_FIELD_RESEARCH", CompressedFlags.BULLETIN_FIELD_RESEARCH),
                    new("Fodder", "BULLETIN_FODDER", CompressedFlags.BULLETIN_FODDER),
                    new("Enchanter", "BULLETIN_ENCHANTER", CompressedFlags.BULLETIN_ENCHANTER),
                    new("Children's", "BULLETIN_CHILDREN", CompressedFlags.BULLETIN_CHILDREN),
                    new("Forager's", "BULLETIN_FORAGER", CompressedFlags.BULLETIN_FORAGER),
                    new("Home Cook's", "BULLETIN_HOME_COOK", CompressedFlags.BULLETIN_HOME_COOK),
                    new("Helpers", "BULLETIN_HELPERS", CompressedFlags.BULLETIN_HELPERS),
                    new("Spirit's Eve", "BULLETIN_SPIRITS_EVE", CompressedFlags.BULLETIN_SPIRITS_EVE),
                    new("Winter Star", "BULLETIN_WINTER_STAR", CompressedFlags.BULLETIN_WINTER_STAR)
                ]
            }
        );
        return data;
    }
}