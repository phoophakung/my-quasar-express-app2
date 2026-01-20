const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // สำคัญ: เพื่อให้ Frontend เรียกข้ามพอร์ตได้
app.use(express.json());

const logsDir = path.join(__dirname, 'logs');
// สร้างโฟลเดอร์ logs อัตโนมัติถ้ายังไม่มี
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

app.get('/api/demo', (req, res) => {
    const logMessage = `Request at ${new Date().toISOString()}: ${req.ip}\n`;
    fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

    res.json({
        git: {
            title: 'Advanced Git Workflow',
            detail: 'ใช้ Branch Protection และ Pull Request ในการทำงานร่วมกัน'
        },
        docker: {
            title: 'Advanced Docker',
            detail: 'ใช้ Multi-stage Build และ Docker Compose เพื่อจัดการ Microservices'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});