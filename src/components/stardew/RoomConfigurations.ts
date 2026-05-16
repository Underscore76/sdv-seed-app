const ROOM_CONFIGS_1_6: RoomDefinition[] = [
  {
    room: "Crafts Room",
    roomSpriteIndex: 13,
    optionalBundleGroups: [
      {
        id: "crafts-1",
        pick: 1,
        bundles: [
          { id: "Sticky", name: "Sticky", flag: "CRAFTS_STICKY" },
          {
            id: "Construction",
            name: "Construction",
            flag: "CRAFTS_CONSTRUCTION",
          },
          {
            id: "Forest",
            name: "Forest",
            flag: "CRAFTS_FOREST",
            optionGroups: [
              {
                id: "crafts-forest-items",
                label: "Items",
                pick: 3,
                options: [
                  {
                    id: "Moss",
                    label: "Moss",
                    objectId: "Moss",
                    flag: "CRAFTS_FOREST_MOSS",
                  },
                  {
                    id: "Fiber",
                    label: "Fiber",
                    objectId: "771",
                    flag: "CRAFTS_FOREST_FIBER",
                  },
                  {
                    id: "Acorn",
                    label: "Acorn",
                    objectId: "309",
                    flag: "CRAFTS_FOREST_ACORN",
                  },
                  {
                    id: "Maple Seed",
                    label: "Maple Seed",
                    objectId: "310",
                    flag: "CRAFTS_FOREST_MAPLE_SEED",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "crafts-2",
        pick: 1,
        bundles: [
          {
            id: "Exotic Foraging",
            name: "Exotic Foraging",
            flag: "CRAFTS_EXOTIC",
          },
          {
            id: "Wild Medicine",
            name: "Wild Medicine",
            flag: "CRAFTS_WILD_MEDICINE",
          },
        ],
      },
    ],
    defaultBundles: [
      {
        id: "Spring Foraging",
        name: "Spring Foraging",
        optionGroups: [
          {
            id: "crafts-spring-foraging-items",
            label: "Items",
            pick: 4,
            options: [
              {
                id: "16",
                label: "Wild Horseradish",
                objectId: "16",
                flag: "CRAFTS_SPRING_FORAGE_WILD_HORSERADISH",
              },
              {
                id: "18",
                label: "Daffodil",
                objectId: "18",
                flag: "CRAFTS_SPRING_FORAGE_DAFFODIL",
              },
              {
                id: "20",
                label: "Leek",
                objectId: "20",
                flag: "CRAFTS_SPRING_FORAGE_LEEK",
              },
              {
                id: "22",
                label: "Dandelion",
                objectId: "22",
                flag: "CRAFTS_SPRING_FORAGE_DANDELION",
              },
              {
                id: "399",
                label: "Spring Onion",
                objectId: "399",
                flag: "CRAFTS_SPRING_FORAGE_SPRING_ONION",
              },
            ],
          },
        ],
      },
      { id: "Summer Foraging", name: "Summer Foraging" },
      { id: "Fall Foraging", name: "Fall Foraging" },
      {
        id: "Winter Foraging",
        name: "Winter Foraging",
        optionGroups: [
          {
            id: "crafts-winter-foraging-items",
            label: "Items",
            pick: 4,
            options: [
              {
                id: "412",
                label: "Winter Root",
                objectId: "412",
                flag: "CRAFTS_WINTER_FORAGE_WINTER_ROOT",
              },
              {
                id: "414",
                label: "Crystal Fruit",
                objectId: "414",
                flag: "CRAFTS_WINTER_FORAGE_CRYSTAL_FRUIT",
              },
              {
                id: "416",
                label: "Snow Yam",
                objectId: "416",
                flag: "CRAFTS_WINTER_FORAGE_SNOW_YAM",
              },
              {
                id: "418",
                label: "Crocus",
                objectId: "418",
                flag: "CRAFTS_WINTER_FORAGE_CROCUS",
              },
              {
                id: "283",
                label: "Holly",
                objectId: "283",
                flag: "CRAFTS_WINTER_FORAGE_HOLLY",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    room: "Pantry",
    roomSpriteIndex: 3,
    optionalBundleGroups: [
      {
        id: "pantry-1",
        pick: 1,
        bundles: [
          {
            id: "Quality Crops",
            name: "Quality Crops",
            flag: "PANTRY_QUALITY_CROPS",
            optionGroups: [
              {
                id: "pantry-quality-spring",
                label: "Spring Crop",
                pick: 1,
                options: [
                  {
                    id: "Parsnip",
                    label: "Parsnip",
                    objectId: "24",
                    flag: "PANTRY_QUALITY_PARSNIP",
                  },
                  {
                    id: "Green Bean",
                    label: "Green Bean",
                    objectId: "188",
                    flag: "PANTRY_QUALITY_GREEN_BEAN",
                  },
                  {
                    id: "Cauliflower",
                    label: "Cauliflower",
                    objectId: "190",
                    flag: "PANTRY_QUALITY_CAULIFLOWER",
                  },
                  {
                    id: "Potato",
                    label: "Potato",
                    objectId: "192",
                    flag: "PANTRY_QUALITY_POTATO",
                  },
                ],
              },
              {
                id: "pantry-quality-summer",
                label: "Summer Crop",
                pick: 1,
                options: [
                  {
                    id: "Melon",
                    label: "Melon",
                    objectId: "254",
                    flag: "PANTRY_QUALITY_MELON",
                  },
                  {
                    id: "Blueberry",
                    label: "Blueberry",
                    objectId: "258",
                    flag: "PANTRY_QUALITY_BLUEBERRY",
                  },
                  {
                    id: "Hot Pepper",
                    label: "Hot Pepper",
                    objectId: "260",
                    flag: "PANTRY_QUALITY_HOT_PEPPER",
                  },
                ],
              },
              {
                id: "pantry-quality-fall",
                label: "Fall Crop",
                pick: 1,
                options: [
                  {
                    id: "Pumpkin",
                    label: "Pumpkin",
                    objectId: "276",
                    flag: "PANTRY_QUALITY_PUMPKIN",
                  },
                  {
                    id: "Yam",
                    label: "Yam",
                    objectId: "280",
                    flag: "PANTRY_QUALITY_YAM",
                  },
                  {
                    id: "Eggplant",
                    label: "Eggplant",
                    objectId: "272",
                    flag: "PANTRY_QUALITY_EGGPLANT",
                  },
                ],
              },
            ],
          },
          { id: "Rare Crops", name: "Rare Crops", flag: "PANTRY_RARE_CROPS" },
        ],
      },
      {
        id: "pantry-2",
        pick: 1,
        bundles: [
          {
            id: "Animal",
            name: "Animal",
            flag: "PANTRY_ANIMAL",
          },
          {
            id: "Fish Farmer's",
            name: "Fish Farmer's",
            flag: "PANTRY_FISH_FARMER",
          },
          {
            id: "Garden",
            name: "Garden",
            flag: "PANTRY_GARDEN",
          },
        ],
      },
      {
        id: "pantry-3",
        pick: 1,
        bundles: [
          {
            id: "Artisan",
            name: "Artisan",
            flag: "PANTRY_ARTISAN",
          },
          {
            id: "Brewer's",
            name: "Brewer's",
            flag: "PANTRY_BREWER",
          },
        ],
      },
    ],
    defaultBundles: [
      {
        id: "Spring Crops",
        name: "Spring Crops",
        optionGroups: [
          {
            id: "pantry-spring-crops-items",
            label: "Items",
            pick: 4,
            options: [
              {
                id: "Parsnip",
                label: "Parsnip",
                objectId: "24",
                flag: "PANTRY_SPRING_CROPS_PARSNIP",
              },
              {
                id: "Green Bean",
                label: "Green Bean",
                objectId: "188",
                flag: "PANTRY_SPRING_CROPS_GREEN_BEAN",
              },
              {
                id: "Cauliflower",
                label: "Cauliflower",
                objectId: "190",
                flag: "PANTRY_SPRING_CROPS_CAULIFLOWER",
              },
              {
                id: "Potato",
                label: "Potato",
                objectId: "192",
                flag: "PANTRY_SPRING_CROPS_POTATO",
              },
              {
                id: "Kale",
                label: "Kale",
                objectId: "250",
                flag: "PANTRY_SPRING_CROPS_KALE",
              },
              {
                id: "Carrot",
                label: "Carrot",
                objectId: "Carrot",
                flag: "PANTRY_SPRING_CROPS_CARROT",
              },
            ],
          },
        ],
      },
      {
        id: "Summer Crops",
        name: "Summer Crops",
        optionGroups: [
          {
            id: "pantry-summer-crops-items",
            label: "Items",
            pick: 4,
            options: [
              {
                id: "Tomato",
                label: "Tomato",
                objectId: "256",
                flag: "PANTRY_SUMMER_CROPS_TOMATO",
              },
              {
                id: "Hot Pepper",
                label: "Hot Pepper",
                objectId: "260",
                flag: "PANTRY_SUMMER_CROPS_HOT_PEPPER",
              },
              {
                id: "Blueberry",
                label: "Blueberry",
                objectId: "258",
                flag: "PANTRY_SUMMER_CROPS_BLUEBERRY",
              },
              {
                id: "Melon",
                label: "Melon",
                objectId: "254",
                flag: "PANTRY_SUMMER_CROPS_MELON",
              },
              {
                id: "Summer Squash",
                label: "Summer Squash",
                objectId: "SummerSquash",
                flag: "PANTRY_SUMMER_CROPS_SUMMER_SQUASH",
              },
            ],
          },
        ],
      },
      {
        id: "Fall Crops",
        name: "Fall Crops",
        optionGroups: [
          {
            id: "pantry-fall-crops-items",
            label: "Items",
            pick: 4,
            options: [
              {
                id: "Corn",
                label: "Corn",
                objectId: "270",
                flag: "PANTRY_FALL_CROPS_CORN",
              },
              {
                id: "Eggplant",
                label: "Eggplant",
                objectId: "272",
                flag: "PANTRY_FALL_CROPS_EGGPLANT",
              },
              {
                id: "Pumpkin",
                label: "Pumpkin",
                objectId: "276",
                flag: "PANTRY_FALL_CROPS_PUMPKIN",
              },
              {
                id: "Yam",
                label: "Yam",
                objectId: "280",
                flag: "PANTRY_FALL_CROPS_YAM",
              },
              {
                id: "Broccoli",
                label: "Broccoli",
                objectId: "Broccoli",
                flag: "PANTRY_FALL_CROPS_BROCCOLI",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    room: "Fish Tank",
    roomSpriteIndex: 11,
    optionalBundleGroups: [
      {
        id: "fish-1",
        pick: 1,
        bundles: [
          {
            id: "Specialty Fish",
            name: "Specialty Fish",
            flag: "FISH_SPECIALITY",
          },
          { id: "Quality Fish", name: "Quality Fish", flag: "FISH_QUALITY" },
          {
            id: "Master Fisher's",
            name: "Master Fisher's",
            flag: "FISH_MASTER",
          },
        ],
      },
    ],
    defaultBundles: [],
  },
  {
    room: "Boiler Room",
    roomSpriteIndex: 20,
    optionalBundleGroups: [
      {
        id: "boiler-room-choose-3",
        pick: 3,
        bundles: [
          {
            id: "Blacksmith's",
            name: "Blacksmith's",
            flag: "BOILER_BLACKSMITH",
          },
          {
            id: "Geologist's",
            name: "Geologist's",
            flag: "BOILER_GEOLOGIST",
          },
          {
            id: "Adventurer's",
            name: "Adventurer's",
            flag: "BOILER_ADVENTURER",
            optionGroups: [
              {
                id: "boiler-adventurer-items",
                label: "Items",
                pick: 4,
                options: [
                  {
                    id: "Slime",
                    label: "Slime",
                    objectId: "766",
                    flag: "BOILER_ADVENTURER_SLIME",
                  },
                  {
                    id: "Bat Wing",
                    label: "Bat Wing",
                    objectId: "767",
                    flag: "BOILER_ADVENTURER_BAT_WING",
                  },
                  {
                    id: "Solar Essence",
                    label: "Solar Essence",
                    objectId: "768",
                    flag: "BOILER_ADVENTURER_SOLAR_ESSENCE",
                  },
                  {
                    id: "Void Essence",
                    label: "Void Essence",
                    objectId: "769",
                    flag: "BOILER_ADVENTURER_VOID_ESSENCE",
                  },
                  {
                    id: "Bone Fragments",
                    label: "Bone Fragments",
                    objectId: "881",
                    flag: "BOILER_ADVENTURER_BONE_FRAGMENTS",
                  },
                ],
              },
            ],
          },
          {
            id: "Treasure Hunter's",
            name: "Treasure Hunter's",
            flag: "BOILER_TREASURE_HUNTER",
          },
          {
            id: "Engineer's",
            name: "Engineer's",
            flag: "BOILER_ENGINEER",
          },
        ],
      },
    ],
    defaultBundles: [],
  },
  {
    room: "Bulletin Board",
    roomSpriteIndex: 31,
    optionalBundleGroups: [
      {
        id: "bulletin-board-choose-5",
        pick: 5,
        bundles: [
          {
            id: "Chef's",
            name: "Chef's",
            flag: "BULLETIN_CHEF",
          },
          {
            id: "Dye",
            name: "Dye",
            flag: "BULLETIN_DYE",
            optionGroups: [
              {
                id: "bulletin-dye-red",
                label: "Red",
                pick: 1,
                options: [
                  {
                    id: "Red Mushroom",
                    label: "Red Mushroom",
                    objectId: "420",
                    flag: "BULLETIN_DYE_RED_MUSHROOM",
                  },
                  {
                    id: "Beet",
                    label: "Beet",
                    objectId: "284",
                    flag: "BULLETIN_DYE_BEET",
                  },
                ],
              },
              {
                id: "bulletin-dye-purple",
                label: "Purple",
                pick: 1,
                options: [
                  {
                    id: "Sea Urchin",
                    label: "Sea Urchin",
                    objectId: "397",
                    flag: "BULLETIN_DYE_SEA_URCHIN",
                  },
                  {
                    id: "Amaranth",
                    label: "Amaranth",
                    objectId: "300",
                    flag: "BULLETIN_DYE_AMARANTH",
                  },
                ],
              },
              {
                id: "bulletin-dye-yellow",
                label: "Yellow",
                pick: 1,
                options: [
                  {
                    id: "Sunflower",
                    label: "Sunflower",
                    objectId: "421",
                    flag: "BULLETIN_DYE_SUNFLOWER",
                  },
                  {
                    id: "Starfruit",
                    label: "Starfruit",
                    objectId: "268",
                    flag: "BULLETIN_DYE_STARFRUIT",
                  },
                ],
              },
              {
                id: "bulletin-dye-green",
                label: "Green",
                pick: 1,
                options: [
                  {
                    id: "Duck Feather",
                    label: "Duck Feather",
                    objectId: "444",
                    flag: "BULLETIN_DYE_DUCK_FEATHER",
                  },
                  {
                    id: "Cactus Fruit",
                    label: "Cactus Fruit",
                    objectId: "90",
                    flag: "BULLETIN_DYE_CACTUS_FRUIT",
                  },
                ],
              },
              {
                id: "bulletin-dye-blue",
                label: "Blue",
                pick: 1,
                options: [
                  {
                    id: "Aquamarine",
                    label: "Aquamarine",
                    objectId: "62",
                    flag: "BULLETIN_DYE_AQUAMARINE",
                  },
                  {
                    id: "Blueberry",
                    label: "Blueberry",
                    objectId: "258",
                    flag: "BULLETIN_DYE_BLUEBERRY",
                  },
                ],
              },
              {
                id: "bulletin-dye-also-purple",
                label: "Also Purple?",
                pick: 1,
                options: [
                  {
                    id: "Red Cabbage",
                    label: "Red Cabbage",
                    objectId: "266",
                    flag: "BULLETIN_DYE_RED_CABBAGE",
                  },
                  {
                    id: "Iridium Bar",
                    label: "Iridium Bar",
                    objectId: "337",
                    flag: "BULLETIN_DYE_IRIDIUM_BAR",
                  },
                ],
              },
            ],
          },
          {
            id: "Field Research",
            name: "Field Research",
            flag: "BULLETIN_FIELD_RESEARCH",
          },
          {
            id: "Fodder",
            name: "Fodder",
            flag: "BULLETIN_FODDER",
          },
          {
            id: "Enchanter's",
            name: "Enchanter's",
            flag: "BULLETIN_ENCHANTER",
          },
          {
            id: "Children's",
            name: "Children's",
            flag: "BULLETIN_CHILDREN",
          },
          {
            id: "Forager's",
            name: "Forager's",
            flag: "BULLETIN_FORAGER",
          },
          {
            id: "Home Cook's",
            name: "Home Cook's",
            flag: "BULLETIN_HOME_COOK",
          },
          {
            id: "Helper's",
            name: "Helper's",
            flag: "BULLETIN_HELPERS",
          },
          {
            id: "Spirit's Eve",
            name: "Spirit's Eve",
            flag: "BULLETIN_SPIRITS_EVE",
          },
          {
            id: "Winter Star",
            name: "Winter Star",
            flag: "BULLETIN_WINTER_STAR",
          },
        ],
      },
    ],
    defaultBundles: [],
  },
];
export { ROOM_CONFIGS_1_6 };
