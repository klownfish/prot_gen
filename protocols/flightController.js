"use strict";

let protGen = require("../protGen.js")

if (process.argv.length < 3) {
    console.log(`usage: node OUTPUT_FILE `)
    return -1
}

let output = process.argv[2]

let s = new protGen.Schema()

let test = 0x00

let gs_to_fc = 0x10
let fc_to_gs = 0x20
let fc_to_gs_tm = 0x50

let fc = "flight_controller"
let gs = "ground_station"
let ec = "edda_controller"

let gs_tc = "ground_station_tc"
let gs_tm = "ground_station_tm"
let fc_tc = "flight_controller_tc"
let fc_can = "flight_controller_can"
let ec_tc = "edda_controller_tc"
let ec_can = "edda_controller_can"

s.setIdType("uint8")
s.setName("fc")

s.addMsg({
    id: 0xFF,
    source: "local",
    target: "local",
    datatype: "local_timestamp",
    fields: {
        timestamp: s.uint(4)
    }
})
//############# REMOVE THESE
s.addMsg({
    id: 64,
    source: "local",
    target: "local",
    datatype: "ms_since_boot",
    fields: {
        ms_since_boot: s.uint(4)
    }
})

s.addMsg({
    id: test++,
    source: "test",
    target: "test",
    datatype: "altitude",
    fields: {
        altitude: s.uint(2),
    }
})

s.addMsg({
    id: test++,
    source: "test",
    target: "test",
    datatype: "acceleration",
    fields: {
        altitude: s.uint(1),
    }
})

s.addMsg({
    id: test++,
    source: "test",
    target: "test",
    datatype: "pressure",
    fields: {
        altitude: s.uint(2),
    }
})

s.addMsg({
    id: test++,
    source: "test",
    target: "test",
    datatype: "catastrophe",
    bitField: [
        "catastrophe"
    ]
})

s.addMsg({
    id: test++,
    source: "test",
    target: "test",
    datatype: "gyro",
    fields: {
        x: s.uint(1),
        y: s.uint(1),
        z: s.uint(1)
    }
})

//##################################remove these ^^^^

//END TEST

s.addMsg({
    id: gs_to_fc++,
    source: gs,
    target: fc_tc,
    datatype: "time_sync",
    fields: {
        system_time: s.uint(4),
    }
});

s.addMsg({
    id: gs_to_fc++,
    source: gs,
    target: fc_tc,
    datatype: "set_power_mode",
})

s.addMsg({
    id: gs_to_fc++,
    source: gs,
    target: fc_tc,
    datatype: "set_radio_equipment",
    bitField: [
        "is_fpv_en",
        "is_tm_en",
    ]   
})

s.addMsg({
    id: gs_to_fc++,
    source: gs,
    target: fc_tc,
    datatype: "set_parachute_output",
    bitField: [
        "is_parachute_armed",
        "is_parachute1_en",
        "is_parachute2_en",
    ]
})

s.addMsg({
    id: gs_to_fc++,
    source: gs,
    target: fc_tc,
    datatype: "set_data_logging",
    bitField: [
        "is_logging_en",
    ]
})


s.addMsg({
    id: gs_to_fc++,
    source: gs,
    target: fc_tc,
    datatype: "dump_flash",
    bitField: [
        "dump_sd",
        "dump_usb"
    ]
})

s.addMsg({
    id: gs_to_fc++,
    source: gs,
    target: fc_tc,
    datatype: "handshake"
})



////////////////////responses
s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "return_time_sync",
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "return_power_mode",
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "return_radio_equipment",
    bitField: [
        'is_fpv_en',
        "is_tm_en"
    ]
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "return_parachute_output",
    bitField: [
        "is_parachute_armed",
        "is_parachute1_en",
        "is_parachute2_en"
    ]
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "onboard_battery_voltage",
    fields: {
        battery_1: s.scaledFloat(2, 100, false),
        battery_2: s.scaledFloat(2, 100, false)
    }
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "gnss_data",
    fields: {
        gnss_time: s.uint(4),
        latitude: s.int(4),
        longitude: s.int(4),
        h_dop: s.scaledFloat(2, 100, false),
        n_satellites: s.uint(1)
    }
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "flight_controller_status",
    fields: {
        HW_state: s.uint(1),
        SW_state: s.uint(1),
        mission_state: s.uint(1),
    }
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "return_data_logging",
    bitField: [
        "is_logging_en"
    ]
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "return_dump_flash",
    bitField: [
        "dump_sd",
        "dump_usb"
    ]
})

s.addMsg({
    id: fc_to_gs++,
    source: fc,
    target: gs_tc,
    datatype: "return_handshake",
})

///////////////////////////////fc telemetry
s.addMsg({
    id: fc_to_gs_tm++,
    source: fc,
    target: gs_tm,
    datatype: "ms_since_boot",
})
s.addMsg({
    id: fc_to_gs_tm++,
    source: fc,
    target: gs_tm,
    datatype: "us_since_boot",
    fields: {
        us_since_boot: s.uint(4)
    }
})

s.addMsg({
    id: fc_to_gs_tm++,
    source: fc,
    target: gs_tm,
    datatype: "current_time",
    fields: {
        ms_since_boot: s.uint(4)
    }
})
s.addMsg({
    id: fc_to_gs_tm++,
    source: fc,
    target: gs_tm,
    datatype: "GNSS_data_1",
    fields: {
        gnss_time: s.uint(4),
        latitude: s.int(4),
        longitude: s.int(4),
    }
})

s.createJson(output);