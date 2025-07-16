import salesModel from "../models/sales.js";

const salesChartsControllers = {};

// =================================
// Ventas por categoría (Para gráfica de barras/pie)
// =================================
salesChartsControllers.getSalesChartByCategory = async (req, res) => {
    try {
        const resultado = await salesModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalVentas: { $sum: { $toDouble: "$total" } },
                    cantidadVentas: { $sum: 1 }
                }
            },
            {
                $sort: { totalVentas: -1 }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalVentas: { $round: ["$totalVentas", 2] },
                    cantidadVentas: 1,
                    porcentaje: {
                        $round: [
                            { $multiply: [
                                { $divide: ["$totalVentas", { $sum: "$totalVentas" }] },
                                100
                            ]}, 2
                        ]
                    }
                }
            }
        ]);

        // Formato optimizado para gráficas
        const chartData = {
            labels: resultado.map(item => item.category),
            datasets: [{
                data: resultado.map(item => item.totalVentas),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                ]
            }],
            rawData: resultado
        };

        res.status(200).json(chartData);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// =================================
// Productos más vendidos (Para gráfica de barras horizontales)
// =================================
salesChartsControllers.getTopProductsChart = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        const resultado = await salesModel.aggregate([
            {
                $group: {
                    _id: "$product",
                    cantidadVendida: { $sum: 1 },
                    totalIngresos: { $sum: { $toDouble: "$total" } }
                }
            },
            {
                $sort: { cantidadVendida: -1 }
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 0,
                    producto: "$_id",
                    cantidadVendida: 1,
                    totalIngresos: { $round: ["$totalIngresos", 2] }
                }
            }
        ]);

        const chartData = {
            labels: resultado.map(item => item.producto),
            datasets: [{
                label: 'Cantidad Vendida',
                data: resultado.map(item => item.cantidadVendida),
                backgroundColor: '#36A2EB'
            }, {
                label: 'Total Ingresos ($)',
                data: resultado.map(item => item.totalIngresos),
                backgroundColor: '#FF6384'
            }],
            rawData: resultado
        };

        res.status(200).json(chartData);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// =================================
// Ventas por período (Para gráfica de líneas)
// =================================
salesChartsControllers.getSalesTimelineChart = async (req, res) => {
    try {
        const { periodo = 'day', startDate, endDate } = req.query;
        
        let dateFormat;
        switch (periodo) {
            case 'month':
                dateFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
                break;
            case 'week':
                dateFormat = { $dateToString: { format: "%Y-W%U", date: "$createdAt" } };
                break;
            default:
                dateFormat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        }

        let matchStage = {};
        if (startDate && endDate) {
            matchStage = {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            };
        }

        const resultado = await salesModel.aggregate([
            ...(Object.keys(matchStage).length ? [{ $match: matchStage }] : []),
            {
                $group: {
                    _id: dateFormat,
                    totalVentas: { $sum: { $toDouble: "$total" } },
                    cantidadVentas: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    fecha: "$_id",
                    totalVentas: { $round: ["$totalVentas", 2] },
                    cantidadVentas: 1
                }
            }
        ]);

        const chartData = {
            labels: resultado.map(item => item.fecha),
            datasets: [{
                label: 'Ventas ($)',
                data: resultado.map(item => item.totalVentas),
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                tension: 0.4
            }, {
                label: 'Cantidad de Ventas',
                data: resultado.map(item => item.cantidadVentas),
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.4
            }],
            rawData: resultado
        };

        res.status(200).json(chartData);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// =================================
// Clientes más frecuentes (Para gráfica de dona)
// =================================
salesChartsControllers.getTopClientsChart = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        
        const resultado = await salesModel.aggregate([
            {
                $group: {
                    _id: "$customer",
                    cantidadCompras: { $sum: 1 },
                    totalGastado: { $sum: { $toDouble: "$total" } }
                }
            },
            {
                $sort: { cantidadCompras: -1 }
            },
            {
                $limit: limit
            },
            {
                $project: {
                    _id: 0,
                    cliente: "$_id",
                    cantidadCompras: 1,
                    totalGastado: { $round: ["$totalGastado", 2] },
                    promedioCompra: { 
                        $round: [{ $divide: ["$totalGastado", "$cantidadCompras"] }, 2] 
                    }
                }
            }
        ]);

        const chartData = {
            labels: resultado.map(item => item.cliente),
            datasets: [{
                label: 'Cantidad de Compras',
                data: resultado.map(item => item.cantidadCompras),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
                ]
            }],
            rawData: resultado
        };

        res.status(200).json(chartData);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default salesChartsControllers;