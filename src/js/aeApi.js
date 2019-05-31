import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import aeEntityManager from './entityManager/aeEntityManager';
export default {
    data() {
        return {
            picker: null
        };
    },
    mounted() {
        
        var czml = [{
            "id" : "document",
            "name" : "CZML Path",
            "version" : "1.0",
            "clock": {
                "interval": "2012-08-04T10:00:00Z/2012-08-04T15:00:00Z",
                "currentTime": "2012-08-04T10:00:00Z",
                "multiplier": 10
            }
        }, {
            "id" : "path",
            "name" : "path with GPS flight data",
            "description" : "<p>Hang gliding flight log data from Daniel H. Friedman.<br>Icon created by Larisa Skosyrska from the Noun Project</p>",
            "availability" : "2012-08-04T10:00:00Z/2012-08-04T15:00:00Z",
            "path" : {
                "material" : {
                    "polylineOutline" : {
                        "color" : {
                            "rgba" : [255, 0, 255, 255]
                        },
                        "outlineColor" : {
                            "rgba" : [0, 255, 255, 255]
                        },
                        "outlineWidth" : 5
                    }
                },
                "width" : 8,
                "leadTime" : 10,
                "trailTime" : 1000,
                "resolution" : 5
            },
            "billboard" : {
                "image" : "data:image/png;base64,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",
                "scale" : 1.5,
                "eyeOffset": {
                    "cartesian": [ 0.0, 0.0, -10.0 ]
                }
            },
            "position" : {
                "epoch" : "2012-08-04T10:00:00Z",
                "cartographicDegrees" : [
                    0,-122.93797,39.50935,1776,
                    10,-122.93822,39.50918,1773,
                    20,-122.9385,39.50883,1772,
                    30,-122.93855,39.50842,1770,
                    40,-122.93868,39.50792,1770,
                    50,-122.93877,39.50743,1767,
                    60,-122.93862,39.50697,1771,
                    70,-122.93828,39.50648,1765,
                    80,-122.93818,39.50608,1770,
                    90,-122.93783,39.5057,1754,
                    100,-122.93777,39.50513,1732,
                    110,-122.93793,39.50458,1727,
                    120,-122.93815,39.50415,1717,
                    130,-122.9382,39.50362,1713,
                    140,-122.93818,39.5031,1703,
                    150,-122.93812,39.50258,1706,
                    160,-122.93792,39.5022,1707,
                    170,-122.93775,39.50177,1698,
                    180,-122.93745,39.50125,1693,
                    190,-122.93723,39.50073,1694,
                    200,-122.9373,39.50023,1702,
                    210,-122.93705,39.49987,1705,
                    220,-122.93642,39.4996,1699,
                    230,-122.93593,39.49927,1693,
                    240,-122.936,39.49895,1691,
                    250,-122.93645,39.49907,1689,
                    260,-122.93685,39.49915,1684,
                    270,-122.93708,39.4989,1680,
                    280,-122.93687,39.49843,1684,
                    290,-122.93685,39.49808,1691,
                    300,-122.93722,39.49815,1688,
                    310,-122.93712,39.49867,1680,
                    320,-122.93633,39.49893,1681,
                    330,-122.93615,39.4989,1682,
                    340,-122.936,39.49885,1682,
                    350,-122.93587,39.49877,1682,
                    360,-122.93577,39.49868,1683,
                    370,-122.93568,39.4986,1685,
                    380,-122.93563,39.49853,1685,
                    390,-122.9356,39.49845,1685,
                    400,-122.9356,39.4984,1685,
                    410,-122.93562,39.49835,1685,
                    420,-122.93565,39.4983,1686,
                    430,-122.93568,39.49827,1684,
                    440,-122.93572,39.49822,1684,
                    450,-122.93575,39.49817,1682,
                    460,-122.93577,39.49812,1682,
                    470,-122.93578,39.49805,1682,
                    480,-122.93573,39.498,1682,
                    490,-122.93567,39.49795,1681,
                    500,-122.93555,39.4979,1678,
                    510,-122.9354,39.49788,1676,
                    520,-122.93522,39.49792,1674,
                    530,-122.93502,39.49795,1674,
                    540,-122.93492,39.4981,1671,
                    550,-122.93483,39.49827,1669,
                    560,-122.93485,39.49842,1668,
                    570,-122.93493,39.49855,1665,
                    580,-122.93502,39.49868,1664,
                    590,-122.93517,39.4987,1665,
                    600,-122.9353,39.49873,1665,
                    610,-122.93543,39.49873,1663,
                    620,-122.93553,39.49873,1661,
                    630,-122.93567,39.49872,1660,
                    640,-122.93577,39.49868,1663,
                    650,-122.93585,39.49865,1665,
                    660,-122.93592,39.49862,1667,
                    670,-122.93597,39.4986,1665,
                    680,-122.93607,39.49857,1664,
                    690,-122.93617,39.49857,1664,
                    700,-122.93627,39.49857,1664,
                    710,-122.93638,39.49857,1664,
                    720,-122.9365,39.49857,1666,
                    730,-122.9366,39.49857,1666,
                    740,-122.93672,39.49852,1668,
                    750,-122.93678,39.49847,1672,
                    760,-122.93685,39.49842,1673,
                    770,-122.93693,39.4984,1672,
                    780,-122.937,39.49837,1670,
                    790,-122.93707,39.49832,1669,
                    800,-122.9371,39.49827,1671,
                    810,-122.93713,39.4982,1671,
                    820,-122.93712,39.49813,1669,
                    830,-122.93708,39.49805,1666,
                    840,-122.93702,39.49797,1663,
                    850,-122.9369,39.49787,1663,
                    860,-122.93675,39.4978,1664,
                    870,-122.93657,39.49773,1667,
                    880,-122.9364,39.49772,1670,
                    890,-122.93623,39.49773,1671,
                    900,-122.93608,39.49777,1670,
                    910,-122.93592,39.49777,1667,
                    920,-122.93573,39.49773,1667,
                    930,-122.93557,39.49767,1667,
                    940,-122.93547,39.49762,1666,
                    950,-122.93538,39.49753,1664,
                    960,-122.93537,39.49747,1661,
                    970,-122.93542,39.49738,1657,
                    980,-122.9355,39.49732,1655,
                    990,-122.9356,39.49727,1653,
                    1000,-122.93573,39.49725,1653,
                    1010,-122.93588,39.49725,1652,
                    1020,-122.93602,39.49728,1652,
                    1030,-122.93617,39.49732,1651,
                    1040,-122.93628,39.49738,1651,
                    1050,-122.93638,39.49745,1650,
                    1060,-122.9365,39.49752,1649,
                    1070,-122.93658,39.4976,1649,
                    1080,-122.93667,39.49768,1650,
                    1090,-122.93675,39.4978,1651,
                    1100,-122.93683,39.49788,1654,
                    1110,-122.93692,39.49797,1658,
                    1120,-122.93698,39.49803,1661,
                    1130,-122.93707,39.4981,1661,
                    1140,-122.93717,39.49817,1661,
                    1150,-122.93725,39.49822,1661,
                    1160,-122.93737,39.49825,1661,
                    1170,-122.93745,39.49823,1662,
                    1180,-122.93748,39.49817,1661,
                    1190,-122.93747,39.49808,1658,
                    1200,-122.93732,39.49803,1657,
                    1210,-122.93715,39.49807,1660,
                    1220,-122.937,39.49813,1663,
                    1230,-122.93692,39.49823,1666,
                    1240,-122.93688,39.49833,1666,
                    1250,-122.93692,39.49843,1665,
                    1260,-122.93698,39.49848,1663,
                    1270,-122.93708,39.4985,1661,
                    1280,-122.93717,39.49848,1660,
                    1290,-122.93725,39.49842,1659,
                    1300,-122.93728,39.49832,1661,
                    1310,-122.93725,39.49823,1663,
                    1320,-122.93717,39.49817,1663,
                    1330,-122.93705,39.49812,1666,
                    1340,-122.93692,39.49812,1666,
                    1350,-122.93675,39.49815,1667,
                    1360,-122.93663,39.49825,1668,
                    1370,-122.93657,39.49835,1670,
                    1380,-122.93655,39.49847,1672,
                    1390,-122.93657,39.49855,1673,
                    1400,-122.93663,39.49863,1673,
                    1410,-122.93675,39.49868,1671,
                    1420,-122.93685,39.49872,1672,
                    1430,-122.93695,39.4987,1674,
                    1440,-122.93702,39.49865,1677,
                    1450,-122.93703,39.49858,1679,
                    1460,-122.93705,39.4985,1680,
                    1470,-122.93702,39.49843,1681,
                    1480,-122.93693,39.49837,1682,
                    1490,-122.93682,39.49833,1683,
                    1500,-122.9367,39.49832,1683,
                    1510,-122.93653,39.4983,1684,
                    1520,-122.93638,39.49833,1686,
                    1530,-122.93627,39.49838,1688,
                    1540,-122.93613,39.49847,1688,
                    1550,-122.93605,39.49857,1688,
                    1560,-122.936,39.49868,1689,
                    1570,-122.93603,39.4988,1691,
                    1580,-122.93612,39.49888,1693,
                    1590,-122.9362,39.49893,1693,
                    1600,-122.9363,39.49893,1695,
                    1610,-122.93638,39.4989,1695,
                    1620,-122.93645,39.49883,1696,
                    1630,-122.93647,39.49877,1696,
                    1640,-122.93643,39.49868,1699,
                    1650,-122.93637,39.4986,1701,
                    1660,-122.93625,39.49857,1702,
                    1670,-122.9361,39.49857,1703,
                    1680,-122.93593,39.49858,1704,
                    1690,-122.9358,39.49862,1704,
                    1700,-122.93568,39.4987,1703,
                    1710,-122.93558,39.4988,1703,
                    1720,-122.93553,39.49892,1703,
                    1730,-122.93553,39.49905,1702,
                    1740,-122.93558,39.49917,1705,
                    1750,-122.93565,39.49925,1708,
                    1760,-122.93573,39.49932,1709,
                    1770,-122.93582,39.49933,1711,
                    1780,-122.93592,39.49932,1713,
                    1790,-122.93595,39.49927,1714,
                    1800,-122.93598,39.4992,1714,
                    1810,-122.93597,39.49912,1715,
                    1820,-122.93588,39.49903,1716,
                    1830,-122.93575,39.49897,1717,
                    1840,-122.9356,39.49895,1718,
                    1850,-122.93545,39.49895,1717,
                    1860,-122.93527,39.499,1717,
                    1870,-122.9351,39.49908,1719,
                    1880,-122.935,39.49918,1719,
                    1890,-122.93492,39.49932,1719,
                    1900,-122.93492,39.49945,1720,
                    1910,-122.93493,39.49957,1721,
                    1920,-122.935,39.49965,1722,
                    1930,-122.9351,39.49972,1724,
                    1940,-122.9352,39.49978,1726,
                    1950,-122.93528,39.4998,1727,
                    1960,-122.93535,39.49982,1728,
                    1970,-122.93543,39.49978,1727,
                    1980,-122.93548,39.49973,1726,
                    1990,-122.93552,39.49965,1728,
                    2000,-122.93548,39.49957,1729,
                    2010,-122.93542,39.49948,1728,
                    2020,-122.93527,39.49942,1729,
                    2030,-122.93512,39.49942,1731,
                    2040,-122.93495,39.49942,1732,
                    2050,-122.9348,39.49948,1731,
                    2060,-122.9347,39.49957,1732,
                    2070,-122.93463,39.49968,1733,
                    2080,-122.93462,39.49978,1733,
                    2090,-122.93463,39.4999,1732,
                    2100,-122.9347,39.49998,1733,
                    2110,-122.93478,39.50003,1736,
                    2120,-122.93487,39.50007,1739,
                    2130,-122.93495,39.50007,1740,
                    2140,-122.93502,39.50005,1741,
                    2150,-122.9351,39.5,1742,
                    2160,-122.93513,39.49993,1743,
                    2170,-122.93513,39.49985,1744,
                    2180,-122.9351,39.49977,1747,
                    2190,-122.93502,39.4997,1750,
                    2200,-122.9349,39.49967,1753,
                    2210,-122.93478,39.49965,1753,
                    2220,-122.93467,39.49965,1750,
                    2230,-122.9345,39.49967,1747,
                    2240,-122.93435,39.49973,1745,
                    2250,-122.9342,39.49983,1747,
                    2260,-122.9341,39.49995,1749,
                    2270,-122.93407,39.50003,1749,
                    2280,-122.93407,39.50013,1749,
                    2290,-122.9341,39.50025,1748,
                    2300,-122.9342,39.50032,1750,
                    2310,-122.9343,39.50037,1751,
                    2320,-122.9344,39.5004,1754,
                    2330,-122.9345,39.50042,1755,
                    2340,-122.93462,39.50042,1756,
                    2350,-122.93468,39.50038,1757,
                    2360,-122.93473,39.50032,1760,
                    2370,-122.93472,39.50025,1762,
                    2380,-122.93463,39.50017,1762,
                    2390,-122.93447,39.50012,1764,
                    2400,-122.93432,39.50013,1766,
                    2410,-122.93415,39.50015,1767,
                    2420,-122.93402,39.50023,1766,
                    2430,-122.9339,39.50032,1765,
                    2440,-122.9338,39.50043,1766,
                    2450,-122.93375,39.50057,1768,
                    2460,-122.93375,39.50068,1769,
                    2470,-122.9338,39.50077,1772,
                    2480,-122.93385,39.50082,1773,
                    2490,-122.93392,39.50085,1773,
                    2500,-122.93402,39.50088,1772,
                    2510,-122.93412,39.50087,1773,
                    2520,-122.93422,39.50083,1775,
                    2530,-122.9343,39.50078,1777,
                    2540,-122.93437,39.50073,1779,
                    2550,-122.9344,39.50067,1782,
                    2560,-122.93438,39.5006,1785,
                    2570,-122.93432,39.50053,1787,
                    2580,-122.9342,39.50048,1787,
                    2590,-122.93408,39.50048,1786,
                    2600,-122.93393,39.50052,1782,
                    2610,-122.93377,39.50057,1781,
                    2620,-122.93367,39.50065,1781,
                    2630,-122.93362,39.50083,1780,
                    2640,-122.93363,39.50098,1782,
                    2650,-122.93368,39.50108,1785,
                    2660,-122.93378,39.50118,1787,
                    2670,-122.93388,39.50125,1789,
                    2680,-122.93398,39.50128,1791,
                    2690,-122.93408,39.50128,1791,
                    2700,-122.93415,39.50125,1790,
                    2710,-122.9342,39.5012,1789,
                    2720,-122.93418,39.50113,1789,
                    2730,-122.93415,39.50108,1789,
                    2740,-122.93407,39.50102,1787,
                    2750,-122.93397,39.50098,1786,
                    2760,-122.93382,39.50097,1785,
                    2770,-122.93365,39.50097,1785,
                    2780,-122.9335,39.501,1785,
                    2790,-122.93337,39.50107,1782,
                    2800,-122.93323,39.50118,1782,
                    2810,-122.93317,39.5013,1783,
                    2820,-122.93317,39.50142,1785,
                    2830,-122.9332,39.50153,1786,
                    2840,-122.93327,39.50162,1786,
                    2850,-122.93337,39.50168,1785,
                    2860,-122.9335,39.50173,1787,
                    2870,-122.93365,39.50177,1790,
                    2880,-122.93377,39.50178,1791,
                    2890,-122.9339,39.50178,1791,
                    2900,-122.93402,39.50177,1790,
                    2910,-122.93413,39.50175,1788,
                    2920,-122.93425,39.50173,1786,
                    2930,-122.9344,39.50172,1785,
                    2940,-122.93452,39.5017,1785,
                    2950,-122.93465,39.50168,1785,
                    2960,-122.93477,39.50167,1784,
                    2970,-122.9349,39.50163,1781,
                    2980,-122.93503,39.5016,1778,
                    2990,-122.9351,39.50153,1778,
                    3000,-122.93512,39.50145,1781,
                    3010,-122.93507,39.50138,1781,
                    3020,-122.93498,39.50135,1778,
                    3030,-122.93485,39.50132,1775,
                    3040,-122.93468,39.50135,1773,
                    3050,-122.93453,39.50143,1772,
                    3060,-122.93442,39.50152,1773,
                    3070,-122.93435,39.50163,1772,
                    3080,-122.93435,39.50173,1770,
                    3090,-122.93442,39.50183,1767,
                    3100,-122.93453,39.50188,1766,
                    3110,-122.93467,39.50187,1765,
                    3120,-122.9348,39.50185,1764,
                    3130,-122.93488,39.50182,1763,
                    3140,-122.93498,39.50177,1763,
                    3150,-122.93505,39.50172,1761,
                    3160,-122.93512,39.50165,1759,
                    3170,-122.93522,39.50158,1757,
                    3180,-122.9353,39.50152,1757,
                    3190,-122.93538,39.50145,1757,
                    3200,-122.93545,39.50142,1755,
                    3210,-122.93553,39.50137,1751,
                    3220,-122.93562,39.5013,1746,
                    3230,-122.9357,39.50125,1744,
                    3240,-122.93578,39.50117,1741,
                    3250,-122.93583,39.50107,1741,
                    3260,-122.93587,39.50098,1741,
                    3270,-122.9359,39.5009,1740,
                    3280,-122.93592,39.5008,1739,
                    3290,-122.93592,39.50072,1739,
                    3300,-122.93585,39.50062,1741,
                    3310,-122.93577,39.50057,1744,
                    3320,-122.93565,39.50053,1743,
                    3330,-122.9355,39.50055,1741,
                    3340,-122.93535,39.50062,1737,
                    3350,-122.93522,39.50073,1735,
                    3360,-122.93517,39.50087,1735,
                    3370,-122.93518,39.50102,1735,
                    3380,-122.93525,39.50113,1733,
                    3390,-122.93537,39.5012,1731,
                    3400,-122.9355,39.50122,1728,
                    3410,-122.93565,39.5012,1726,
                    3420,-122.9358,39.50118,1726,
                    3430,-122.93595,39.50115,1726,
                    3440,-122.93607,39.50112,1728,
                    3450,-122.93617,39.50108,1731,
                    3460,-122.93625,39.50105,1734,
                    3470,-122.93633,39.50102,1736,
                    3480,-122.93638,39.50097,1737,
                    3490,-122.93642,39.50088,1738,
                    3500,-122.93638,39.5008,1738,
                    3510,-122.9363,39.50072,1739,
                    3520,-122.93617,39.50067,1740,
                    3530,-122.93602,39.50065,1742,
                    3540,-122.93583,39.50067,1742,
                    3550,-122.9357,39.50073,1743,
                    3560,-122.93558,39.50083,1744,
                    3570,-122.93552,39.50097,1745,
                    3580,-122.93552,39.50108,1744,
                    3590,-122.93557,39.5012,1744,
                    3600,-122.93567,39.50127,1743,
                    3610,-122.93577,39.50133,1743,
                    3620,-122.9359,39.50128,1747,
                    3630,-122.93595,39.50123,1752,
                    3640,-122.93598,39.50118,1755,
                    3650,-122.936,39.50112,1756,
                    3660,-122.936,39.50103,1756,
                    3670,-122.93595,39.50095,1757,
                    3680,-122.93585,39.50087,1761,
                    3690,-122.93572,39.50083,1764,
                    3700,-122.93557,39.50085,1767,
                    3710,-122.93543,39.5009,1769,
                    3720,-122.93532,39.50098,1768,
                    3730,-122.93522,39.5011,1767,
                    3740,-122.93518,39.50125,1766,
                    3750,-122.9352,39.5014,1766,
                    3760,-122.93527,39.50152,1768,
                    3770,-122.93537,39.5016,1770,
                    3780,-122.93548,39.50163,1773,
                    3790,-122.93558,39.50163,1773,
                    3800,-122.93567,39.50163,1774,
                    3810,-122.93577,39.5016,1776,
                    3820,-122.9358,39.50153,1778,
                    3830,-122.93578,39.50145,1780,
                    3840,-122.93573,39.50138,1781,
                    3850,-122.93563,39.5013,1781,
                    3860,-122.93547,39.50127,1781,
                    3870,-122.93527,39.50145,1783,
                    3880,-122.93515,39.50157,1786,
                    3890,-122.93513,39.5017,1790,
                    3900,-122.93515,39.50182,1793,
                    3910,-122.93522,39.50192,1797,
                    3920,-122.9353,39.50198,1797,
                    3930,-122.9354,39.502,1798,
                    3940,-122.93552,39.50197,1799,
                    3950,-122.93557,39.50192,1803,
                    3960,-122.93558,39.50185,1807,
                    3970,-122.93555,39.50177,1809,
                    3980,-122.93548,39.50168,1813,
                    3990,-122.93535,39.50163,1816,
                    4000,-122.93522,39.50163,1817,
                    4010,-122.93507,39.50163,1821,
                    4020,-122.93492,39.5017,1824,
                    4030,-122.9348,39.50177,1826,
                    4040,-122.9347,39.50187,1827,
                    4050,-122.93462,39.50198,1828,
                    4060,-122.9346,39.5021,1831,
                    4070,-122.93462,39.50223,1832,
                  
              
                ]
            }
        }];
        this.viewer.dataSources.add(Cesium.CzmlDataSource.load(czml)).then(function(ds) {
            this.viewer.trackedEntity = ds.entities.getById('path');
        });     
    },
    methods: {
        createEntity(options) {
            let entity = aeEntityManager.genEntity(options);
            this.viewer.entities.add(entity);
            viewer.zoomTo(entities);
        },

        toDegrees(radians) {
            return Cesium.Math.toDegrees(radians);
        },
        toRadians(degrees) {
            return Cesium.Math.toRadians(degrees);
        },
        XYZ2LLH(pos) {
            if (!pos || !pos.x || !pos.y || !pos.z) return null;
            if (this.viewer && this.viewer.scene && this.viewer.scene.globe && this.viewer.scene.globe.ellipsoid) {
                let cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(new Cesium.Cartesian3(pos.x, pos.y, pos.z));
                return {
                    longitude: Cesium.Math.toDegrees(cartographic.longitude),
                    latitude: Cesium.Math.toDegrees(cartographic.latitude),
                    height: cartographic.height
                };
            }
            return null;
        },
        LLH2XYZ(pos) {
            if (!pos || !pos.longitude || !pos.latitude || !pos.height) return null;
            if (this.viewer && this.viewer.scene && this.viewer.scene.globe && this.viewer.scene.globe.ellipsoid) {
                let position = {};
                if (-Math.PI <= pos.longitude && pos.longitude <= Math.PI && -Math.PI / 2 <= pos.latitude && pos.latitude <= Math.PI / 2) {
                    position = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height, this.viewer.scene.globe.ellipsoid);
                } else {
                    position = Cesium.Cartesian3.fromDegrees(pos.longitude, pos.latitude, pos.height, this.viewer.scene.globe.ellipsoid);
                }
                return {
                    x: position.x,
                    y: position.y,
                    z: position.z
                };
            }
            return null;
        },
        addImageryLayer(name, visible, provider, options, index) {
            return ImageryManager.addImagery(this.viewer, ImageryManager.genImagery(name, visible, provider, options), index);
        },
        delImageryLayer(name) {
            return ImageryManager.delImagery(this.viewer, name, false);
        },
        delImageryLayers(name) {
            return ImageryManager.delImagery(this.viewer, name, true);
        },
        getImageryLayerByName(name) {
            return ImageryManager.getImagery(this.viewer, name);
        },
        getImageryLayersByName(name) {
            return ImageryManager.getImageries(this.viewer, name);
        },
        getImageryLayers() {
            return ImageryManager.getImageries(this.viewer);
        },
        setImageryLayerVisible(imageryLayer, visible) {
            if (!imageryLayer || !(imageryLayer instanceof Cesium.ImageryLayer)) return false;
            imageryLayer.show = visible;
            return true;
        },
        setImageryLayerAlpha(imageryLayer, alpha) {
            if (!imageryLayer || !(imageryLayer instanceof Cesium.ImageryLayer)) return false;
            imageryLayer.alpha = alpha;
            return true;
        },

        // genGrids(range, dimensions) {
        //     if (!this.viewer) return null;
        //     return DataSourceManager.addDataSource(this.viewer, DataSourceManager.genGrids(range, dimensions));
        // },


        async loadDataSource(name, visible, provider, data, options) {
            if (!this.viewer) return null;
            let ret = null;
            await DataSourceManager.loadDataSource(name, visible, provider, data, options).then(ds => {
                ret = DataSourceManager.addDataSource(this.viewer, ds);
            });
            return ret;
        },
        delDataSource(name) {
            return DataSourceManager.delDataSource(this.viewer, name, false);
        },
        delDataSources(name) {
            return DataSourceManager.delDataSource(this.viewer, name, true);
        },
        getDataSourceByName(name) {
            return DataSourceManager.getDataSource(this.viewer, name);
        },
        getDataSourcesByName(name) {
            return DataSourceManager.getDataSources(this.viewer, name);
        },
        getDataSources() {
            return DataSourceManager.getDataSources(this.viewer);
        },
        setDataSourceVisible(datasource, visible) {
            if (!datasource) return false;
            datasource.show = visible;
            return true;
        },

        /*
            addFeature(name, visible, options, parent) {
                let feature = FeatureManager.genFeature(name, visible, options);
                if (feature && parent && parent instanceof Cesium.Entity) {
                    feature.parent = parent;
                    feature.type = '';
                }
                return FeatureManager.addFeature(this.viewer, feature);
            },
            */
        addFeature(name, visible, options) {
            if (Array.isArray(options)) return FeatureManager.addFeatures(this.viewer, FeatureManager.genFeatures(name, visible, options));
            return FeatureManager.addFeature(this.viewer, FeatureManager.genFeature(name, visible, options));
        },
        delFeature(name) {
            return FeatureManager.delFeature(this.viewer, name, false);
        },
        delFeatures(name) {
            return FeatureManager.delFeature(this.viewer, name, true);
        },
        getFeatureByName(name) {
            return FeatureManager.getFeature(this.viewer, name);
        },
        getFeaturesByName(name) {
            return FeatureManager.getFeatures(this.viewer, name);
        },
        getFeatures() {
            return FeatureManager.getFeatures(this.viewer);
        },
        setFeatureVisible(feature, visible) {
            if (!feature) return false;
            feature.show = visible;
            return true;
        },

        async loadModel(name, visible, position, rotation, options, distanceDisplayCondition) {
            if (!this.viewer) return null;
            let ret = null;
            await ModelManager.loadModelAsync(name, visible, position, rotation, options, distanceDisplayCondition).then(model => {
                ret = ModelManager.addModel(this.viewer, model);
            });
            return ret;
        },
        addModel(name, visible, position, rotation, options, distanceDisplayCondition) {
            return ModelManager.addModel(this.viewer, ModelManager.loadModel(name, visible, position, rotation, options, distanceDisplayCondition));
        },
        delModel(name) {
            return ModelManager.delModel(this.viewer, name, false);
        },
        delModels(name) {
            return ModelManager.delModel(this.viewer, name, true);
        },
        getModelByName(name) {
            return ModelManager.getModel(this.viewer, name);
        },
        getModelsByName(name) {
            return ModelManager.getModels(this.viewer, name);
        },
        getModels() {
            return ModelManager.getModels(this.viewer, null);
        },
        setModelVisible(model, visible) {
            if (!model) return false;
            model.show = visible;
            return true;
        },
        setNodesVisible(model, visibles) {
            if (!model || typeof visibles !== 'object') return false;
            let conditions = [];
            for (let id in visibles) {
                if (id === 'default') continue;
                conditions.push(['${id}===' + id, visibles[id] ? 'true' : 'false']);
            }
            let left = true;
            if (visibles.hasOwnProperty('default')) left = visibles['default'] ? 'true' : 'false';
            conditions.push(['true', left]);

            let style = {};
            if (model.style && model.style.style) style = model.style.style;
            style.show = { conditions };
            model.style = new Cesium.Cesium3DTileStyle(style);
            return true;
        },
        setNodesColor(model, colors) {
            if (!model || typeof colors !== 'object') return false;
            let conditions = [];
            for (let id in colors) {
                if (id === 'default') continue;
                conditions.push([' ${id}=== ' + id, colors[id]]);
            }
            conditions.push(['true', colors.hasOwnProperty('default') ? colors['default'] : 'rgba(255,255,255,1.0)']);

            let style = {};
            if (model.style && model.style.style) style = model.style.style;
            style.color = { conditions };
            model.style = new Cesium.Cesium3DTileStyle(style);
            return true;
        },

        setClock(start, stop, current, multiplier = 1.0, loop = true) {
            if (!this.viewer || !this.viewer.clock) return false;
            if (!(start instanceof Date) || !(stop instanceof Date)) return false;
            this.viewer.clock.startTime = Cesium.JulianDate.fromDate(start);
            this.viewer.clock.stopTime = Cesium.JulianDate.fromDate(stop);
            this.viewer.clock.currentTime = current && current instanceof Date ? Cesium.JulianDate.fromDate(current) : this.viewer.clock.startTime.clone();
            this.viewer.clock.clockRange = loop ? Cesium.ClockRange.LOOP_STOP : Cesium.ClockRange.CLAMPED;
            this.viewer.clock.multiplier = multiplier;
            return true;
        },
        addPathAnimation(name, visible, date, paths, options) {
            return PathAnimationManager.addPathAnimation(this.viewer, PathAnimationManager.genPathAnimation(name, visible, date, paths, options));
        },
        delPathAnimation(name) {
            return PathAnimationManager.delPathAnimation(this.viewer, name, false);
        },
        delPathAnimations(name) {
            return PathAnimationManager.delPathAnimation(this.viewer, name, true);
        },
        getPathAnimationByName(name) {
            return PathAnimationManager.getPathAnimation(this.viewer, name);
        },
        getPathAnimationsByName(name) {
            return PathAnimationManager.getPathAnimations(this.viewer, name);
        },
        getPathAnimations() {
            return PathAnimationManager.getPathAnimations(this.viewer);
        },
        setPathAnimationVisible(pa, visible) {
            if (!pa) return false;
            pa.show = visible;
            return true;
        },

        getCamera() {
            if (!this.viewer || !this.viewer.camera) return {};

            let llh = {};
            try {
                let cartesian = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(this.viewer.canvas.clientWidth / 2, this.viewer.canvas.clientHeight / 2));
                let cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                llh.longitude = Cesium.Math.toDegrees(cartographic.longitude);
                llh.latitude = Cesium.Math.toDegrees(cartographic.latitude);
                llh.height = cartographic.height;
            } catch (err) {
                llh = null;
            }

            return {
                location: llh,
                position: {
                    x: this.viewer.camera.position.x,
                    y: this.viewer.camera.position.y,
                    z: this.viewer.camera.position.z
                },
                orientation: {
                    heading: Cesium.Math.toDegrees(this.viewer.camera.heading),
                    pitch: Cesium.Math.toDegrees(this.viewer.camera.pitch),
                    roll: Cesium.Math.toDegrees(this.viewer.camera.roll)
                }
            };
        },
        unlockCamera() {
            if (!this.viewer || !this.viewer.camera) return false;
            this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        },
        lockCamera() {
            if (!this.viewer || !this.viewer.camera) return false;

            let llh = {};
            try {
                let cartesian = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(this.viewer.canvas.clientWidth / 2, this.viewer.canvas.clientHeight / 2));
                let cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                llh.longitude = Cesium.Math.toDegrees(cartographic.longitude);
                llh.latitude = Cesium.Math.toDegrees(cartographic.latitude);
                llh.height = cartographic.height;
            } catch (err) {
                return false;
            }

            let p1 = Cesium.Cartesian3.fromDegrees(llh.longitude, llh.latitude, llh.height);
            let p2 = this.viewer.camera.positionWC;
            this.viewer.camera.lookAt(p1, new Cesium.HeadingPitchRange(this.viewer.camera.heading, this.viewer.camera.pitch, Cesium.Cartesian3.distance(p1, p2)));
            return true;
        },

        flyTo(object, heading, pitch, range, duration) {
            if (!this.viewer || !object) return false;
            if (!pitch) pitch = -45;
            if (pitch > -0.001) pitch = -0.001;
            if (pitch < -90) pitch = -90;
            // this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            return this.viewer.flyTo(object, {
                offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading || 0), Cesium.Math.toRadians(pitch), range || 100),
                duration
            });
        },
        flyToLocation(longitude, latitude, height, heading, pitch, range, duration) {
            if (!this.viewer || !this.viewer.camera) return false;
            if (!pitch) pitch = -45;
            if (pitch > -0.001) pitch = -0.001;
            if (pitch < -90) pitch = -90;
            let camera1 = new Cesium.Camera(this.viewer.scene);
            camera1.lookAt(Cesium.Cartesian3.fromDegrees(longitude, latitude, height), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading || 0), Cesium.Math.toRadians(pitch), range || 100));
            // this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            return this.viewer.camera.flyTo({
                destination: camera1.positionWC,
                orientation: {
                    heading: Cesium.Math.toRadians(heading || 0),
                    pitch: Cesium.Math.toRadians(pitch),
                    roll: 0.0
                },
                duration
            });
        },
        flyToPosition(x, y, z, heading, pitch, roll, duration) {
            if (!this.viewer || !this.viewer.camera) return false;
            if (!pitch) pitch = -45;
            if (pitch > -0.001) pitch = -0.001;
            if (pitch < -90) pitch = -90;
            // this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            this.viewer.camera.flyTo({
                destination: new Cesium.Cartesian3(x, y, z),
                orientation: {
                    heading: Cesium.Math.toRadians(heading || 0),
                    pitch: Cesium.Math.toRadians(pitch),
                    roll: 0.0
                },
                duration
            });
            return true;
        },
        lookAtLocation(longitude, latitude, height, heading, pitch, range) {
            if (!this.viewer || !this.viewer.camera) return false;
            if (!pitch) pitch = -45;
            if (pitch > -0.001) pitch = -0.001;
            if (pitch < -90) pitch = -90;
            return this.viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(longitude, latitude, height), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading || 0), Cesium.Math.toRadians(pitch), range || 100));
        },
        lookAtPosition(x, y, z, heading, pitch, range) {
            if (!this.viewer || !this.viewer.camera) return false;
            if (!pitch) pitch = -45;
            if (pitch > -0.001) pitch = -0.001;
            if (pitch < -90) pitch = -90;
            return this.viewer.camera.lookAt(new Cesium.Cartesian3(x, y, z), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(heading || 0), Cesium.Math.toRadians(pitch), range || 100));
        },
        trackEntity(entity) {
            if (!this.viewer) return false;
            this.viewer.trackdEntity = entity;
            return true;
        },

        setGlobeVisible(visible) {
            if (!this.viewer || !this.viewer.scene) return false;
            if (this.viewer.scene.globe) this.viewer.scene.globe.show = visible;
            if (this.viewer.scene.skyAtmosphere) this.viewer.scene.skyAtmosphere.show = visible;
            if (this.viewer.scene.sun) this.viewer.scene.sun.show = visible;
            if (this.viewer.scene.moon) this.viewer.scene.moon.show = visible;
            return true;
        },
        setSkyBox({ positiveX, negativeX, positiveY, negativeY, positiveZ, negativeZ }) {
            if (!this.viewer || !this.viewer.scene) return false;
            let sb = new Cesium.SkyBox({ sources: { positiveX, negativeX, positiveY, negativeY, positiveZ, negativeZ } });
            if (!sb) return false;
            this.viewer.scene.skyBox = sb;
            return true;
        },
        bindAction(action, func) {
            if (typeof func !== 'function') return false;
            if (typeof action !== 'string') return false;
            switch (action.toUpperCase()) {
                case 'LEFT_CLICK':
                    action = Cesium.ScreenSpaceEventType.LEFT_CLICK;
                    break;
                case 'LEFT_DOUBLE_CLICK':
                    action = Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK;
                    break;
                case 'LEFT_DOWN':
                    action = Cesium.ScreenSpaceEventType.LEFT_DOWN;
                    break;
                case 'LEFT_UP':
                    action = Cesium.ScreenSpaceEventType.LEFT_UP;
                    break;
                case 'MOUSE_MOVE':
                    action = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
                    break;
                case 'MIDDLE_CLICK':
                    action = Cesium.ScreenSpaceEventType.MIDDLE_CLICK;
                    break;
                case 'MIDDLE_DOWN':
                    action = Cesium.ScreenSpaceEventType.MIDDLE_DOWN;
                    break;
                case 'MIDDLE_UP':
                    action = Cesium.ScreenSpaceEventType.MIDDLE_UP;
                    break;
                case 'RIGHT_CLICK':
                    action = Cesium.ScreenSpaceEventType.RIGHT_CLICK;
                    break;
                case 'RIGHT_DOWN':
                    action = Cesium.ScreenSpaceEventType.RIGHT_DOWN;
                    break;
                case 'RIGHT_UP':
                    action = Cesium.ScreenSpaceEventType.RIGHT_UP;
                    break;
                default:
                    return false;
            }
            if (!this.picker) return false;

            this.picker.setInputAction(mouse => {
                let viewer = this.viewer;
                if (!viewer) return;
                let scene = viewer.scene;
                if (!scene) return;

                let xy = action === Cesium.ScreenSpaceEventType.MOUSE_MOVE ? mouse.endPosition : mouse.position;
                let cartesian = null;
                let position = null;
                let picked = scene.pick(xy);
                if (picked) {
                    cartesian = scene.pickPosition(xy);
                } else if (viewer.camera) {
                    cartesian = viewer.camera.pickEllipsoid(xy);
                }
                if (cartesian && scene.globe && scene.globe.ellipsoid) {
                    let cartographic = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                    if (cartographic) position = { longitude: Cesium.Math.toDegrees(cartographic.longitude), latitude: Cesium.Math.toDegrees(cartographic.latitude), height: cartographic.height };
                }
                func(picked, position);
            }, action);
            return true;
        },

        addHighlightHandler(color) {
            if (!this.viewer || !this.viewer.scene || !this.viewer.scene.postProcessStages) return null;
            let handler = this.viewer.scene.postProcessStages.add(
                new Cesium.PostProcessStage({
                    fragmentShader: `
uniform sampler2D colorTexture;
varying vec2 v_textureCoordinates;
uniform vec4 highlight;
void main() {
    vec4 color = texture2D(colorTexture, v_textureCoordinates);
    if (czm_selected())
        gl_FragColor = vec4(highlight.a * highlight.rgb + (1.0 - highlight.a) * color.rgb, 1.0 - highlight.a);
    else
        gl_FragColor = color;
}`,
                    uniforms: {
                        highlight: Cesium.Color.fromCssColorString(color)
                    }
                })
            );
            if (handler) {
                handler.selected = [];
                Object.defineProperty(handler, 'target', {
                    get() {
                        return this.selected;
                    },
                    set(target) {
                        handler.selected = !target ? [] : Array.isArray(target) ? target : [target];
                    }
                });
                Object.defineProperty(handler, 'color', {
                    get() {
                        return this.uniforms.highlight.toCssColorString();
                    },
                    set(color) {
                        this.uniforms.highlight = Cesium.Color.fromCssColorString(color);
                    }
                });
            }
            return handler;
        },
        delHighlightHandler(handler) {
            if (!this.viewer || !this.viewer.scene || !this.viewer.scene.postProcessStages) return false;
            if (!handler || !(handler instanceof Cesium.PostProcessStage)) return false;
            handler.selected = [];
            handler.destroy();
            // return this.viewer.scene.postProcessStages.remove(handler);
            return true;
        },

        ajax(method, url, params) {
            return Vue.axios({
                url,
                method,
                baseURL: this.configs.baseURL,
                headers: { Authorization: 'JWT ' + this.$cookies.get('token') },
                params,
                responseType: 'json'
            });
        }
    }
};