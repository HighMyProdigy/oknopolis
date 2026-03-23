<?php
// Настройки Telegram бота
$telegram_bot_token = "8674518890:AAFtK2wloFgdRyzCvB57r7u-57JwZVJGlxU"; // Ваш токен от @BotFather
$telegram_chat_id = "1474112548"; // Ваш chat_id от @userinfobot

// Обработка AJAX запросов
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    
    $action = $_POST['action'];
    
    if ($action === 'send_callback') {
        $phone = htmlspecialchars($_POST['phone'] ?? '');
        $comment = htmlspecialchars($_POST['comment'] ?? '');
        $source = htmlspecialchars($_POST['source'] ?? 'Форма на сайте');
        
        $message = "🔔 <b>Новая заявка с сайта!</b>\n\n";
        $message .= "📞 <b>Телефон:</b> {$phone}\n";
        if ($comment) {
            $message .= "💬 <b>Комментарий:</b> {$comment}\n";
        }
        $message .= "📄 <b>Источник:</b> {$source}\n";
        $message .= "🕐 <b>Время:</b> " . date('d.m.Y H:i');
        
        $url = "https://api.telegram.org/bot{$telegram_bot_token}/sendMessage";
        $data = [
            'chat_id' => $telegram_chat_id,
            'text' => $message,
            'parse_mode' => 'HTML'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        
        $result = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($http_code === 200) {
            $response = json_decode($result, true);
            if ($response['ok']) {
                echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Ошибка Telegram: ' . ($response['description'] ?? 'Неизвестная ошибка')]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Ошибка HTTP: ' . $http_code]);
        }
        exit;
    }
}

// Если запрос не POST или action не указан
echo json_encode(['success' => false, 'message' => 'Неверный запрос']);
?>