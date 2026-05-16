const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Setup Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Test endpoint
app.get("/", (req, res) => {
    res.json({ message: "Server berjalan! 🚀" });
});

// Endpoint: Ambil semua menu
app.get("/api/menus", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("menus")
            .select("*")
            .order("category", { ascending: true });

        if (error) throw error;

        res.json({
            success: true,
            data: data,
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Endpoint: Buat pesanan baru
app.post("/api/orders", async (req, res) => {
    try {
        const { table_number, customer_name, items } = req.body;

        // Validasi input
        if (!table_number || !customer_name || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Data tidak lengkap (table_number, customer_name, items diperlukan)",
            });
        }

        // 1. Buat order baru di tabel orders
        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert([
                {
                    table_number: parseInt(table_number),
                    customer_name,
                    status: "pending",
                },
            ])
            .select();

        if (orderError) throw orderError;

        const orderId = orderData[0].id;

        // 2. Buat order_items untuk setiap item di keranjang
        const orderItems = items.map((item) => ({
            order_id: orderId,
            menu_id: item.id,
            quantity: item.quantity,
            notes: item.notes || "",
        }));

        const { data: itemsData, error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // 3. Return order_id ke frontend
        res.json({
            success: true,
            message: "Pesanan berhasil dibuat!",
            order_id: orderId,
            table_number,
            customer_name,
        });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Endpoint: Ambil detail pesanan berdasarkan ID
app.get("/api/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;

        res.json({
            success: true,
            order: data,
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Endpoint: Ambil items dalam pesanan
app.get("/api/orders/:id/items", async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("order_items")
            .select(`
        id,
        quantity,
        notes,
        menus (
          id,
          name,
          price
        )
      `)
            .eq("order_id", id);

        if (error) throw error;

        // Format data
        const items = data.map(item => ({
            id: item.id,
            menu_name: item.menus.name,
            price: item.menus.price,
            quantity: item.quantity,
            notes: item.notes
        }));

        res.json({
            success: true,
            items: items,
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Endpoint: Ambil semua pesanan
app.get("/api/orders", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            orders: data,
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Endpoint: Update status pesanan
app.patch("/api/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status tidak boleh kosong",
            });
        }

        const { data, error } = await supabase
            .from("orders")
            .update({ status, updated_at: new Date() })
            .eq("id", id)
            .select();

        if (error) throw error;

        res.json({
            success: true,
            message: "Status berhasil diupdate",
            order: data[0],
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server jalan di http://localhost:${PORT}`);
});