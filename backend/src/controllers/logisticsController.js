export const getLogisticsProtocols = (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        coldChainTemperatureRange: "2°C to 8°C (Strict Zero-Excursion)",
        controlledRoomTempRange: "15°C to 25°C",
        thermalPackagingSpecs: "Phase Change Material (PCM) VIP Insulated Shippers with 96-hour holdover validation",
        departureAirports: [
          { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", location: "Mumbai", transitTime: "Express Connection" },
          { name: "Indira Gandhi International Airport (DEL)", location: "Delhi", transitTime: "Priority Cargo Route" },
          { name: "Dr. Babasaheb Ambedkar International Airport (NAG)", location: "Nagpur", transitTime: "Origin Hub" }
        ],
        availableIncoterms: [
          { code: "CIF", name: "Cost, Insurance, and Freight (Air / Ocean)" },
          { code: "FOB", name: "Free on Board (Mumbai International Port)" },
          { code: "EXW", name: "Ex Works (Nagpur Central Logistics Terminal)" },
          { code: "DAP", name: "Delivered at Place (Direct to Consignee Hospital/Warehouse)" }
        ]
      }
    });
  } catch (err) {
    next(err);
  }
};
