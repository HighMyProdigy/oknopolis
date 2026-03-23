const { createApp, ref, computed, onMounted, nextTick } = Vue;

const app = createApp({
    setup() {
        const contact = ref({
            phone: '+7 (962) 753 77-03',
            phoneLink: 'tel:+79627537703',
            address: 'Астрахань, Безжонова, 99Б',
            schedule: 'Пн — Пт 09:00–17:00 Суббота 09:00–15:00',
            email: 'Oknopolis30@yandex.ru'
        });

        const promo = ref({
            title: 'Летняя акция! Скидка 20%',
            subtitle: 'Закажите москитную сетку сегодня — получите скидку на установку!'
        });

        const conditions = ref([
            { icon: '🚗', text: 'Выезд мастера по Астрахани — 600 ₽' },
            { icon: '📋', text: 'При договоре вызов бесплатный' },
            { icon: '💰', text: 'Минимальная сумма заказа — 1500 ₽' }
        ]);

        const paymentMethods = ref(['Наличные', 'Банковские карты', 'Перевод']);

        const config = ref({
            types: [
                { name: 'Рамочная Standart', price: 1000 },
                { name: 'Вставная Standart', price: 1200 },
                { name: 'Москитная дверь 42/17', price: 2500 },
                { name: 'Москитная дверь 25/17', price: 2300 },
                { name: 'Плиссе c40', price: 4000 },
                { name: 'Плиссе c20', price: 3800 }
            ],
            colors: [
                { name: 'Белый RAL 9016', value: 'white', priceModifier: 0 },
                { name: 'Коричневый RAL 8017', value: 'brown', priceModifier: 150 },
                { name: 'Антрацит RAL 7016', value: 'anthracite', priceModifier: 150 },
                { name: 'RAL (на выбор)', value: 'custom', priceModifier: 400 }
            ],
            meshes: [
                { name: 'Стандарт', price: 210, desc: 'Базовая защита от насекомых' },
                { name: 'Антимошка', price: 1000, desc: 'Мелкая ячейка от мошки' },
                { name: 'Антикошка', price: 2000, desc: 'Усиленное полотно для питомцев' },
                { name: 'Антипыльца', price: 1000, desc: 'Для аллергиков' },
                { name: 'Респилон', price: 4000, desc: 'Премиум защита' },
                { name: 'Ультравью', price: 400, desc: 'Тонкие нити, невидимая' }
            ],
            services: [
                { name: 'Самовывоз', price: 0 },
                { name: 'Доставка', price: 300 },
                { name: 'Замер', price: 600 },
                { name: 'Монтаж', price: 600 }
            ]
        });

        const constructions = ref([
            { id:1, title:'Рамочные', price:'от 1000 руб/м²', description:'Самый распространенный тип. Состоят из рамки, специального профиля и полотна.', img:'images/7.png', icon:'🪟' },
            { id:2, title:'Вставные', price:'2500 руб/м²', description:'Не требуют установки крепежа в раму окна — оно остаётся без лишних отверстий.', img:'images/8.png', icon:'🔲' },
            { id:3, title:'Роллетные', price:'4500 руб/м²', description:'Сворачиваются в ролик сверху проёма — не нужно искать место для хранения.', img:'images/9.png', icon:'🌀' },
            { id:4, title:'Раздвижные', price:'от 2300 руб/м²', description:'Из специального профиля для установки в рельсы-направляющие.', img:'images/10.png', icon:'↔️' },
            { id:5, title:'Плиссе', price:'от 4000 руб/м²', description:'Тип «гармошки». Занимает мало места и не требует хранения.', img:'images/11.png', icon:'📚' },
            { id:6, title:'Дверные', price:'от 2000 руб/м²', description:'Распашные, устанавливаются на петли в дверной проём.', img:'images/12.png', icon:'🚪' }
        ]);

        const meshTypes = ref([
            { id:1, name:'Стандарт', price:'от 1000 ₽/м²', description:'Стандартное москитное полотно. Отлично защищает от насекомых.', img:'images/1.png', icon:'🛡️' },
            { id:2, name:'Ультравью', price:'от 3000 ₽/м²', description:'Особо тонкие нити практически не заметны и не закрывают обзор.', img:'images/2.png', icon:'👁️' },
            { id:3, name:'Антикошка', price:'2500 ₽/м²', description:'Прочный вид полотна, выдерживает когти питомцев.', img:'images/3.png', icon:'🐱' },
            { id:4, name:'Антипыль', price:'2000 ₽/м²', description:'Размер ячейки не позволяет пробраться даже маленьким мошкам и пыли.', img:'images/4.png', icon:'🌫️' },
            { id:5, name:'Антипыльца', price:'3000 ₽/м²', description:'Структура полотна задерживает пыль и пыльцу от растений.', img:'images/5.png', icon:'🌸' },
            { id:6, name:'Защитное', price:'индивидуально', description:'Самая технологичная сетка. Способна задерживать вредные выбросы.', img:'images/6.png', icon:'⚡' }
        ]);

        const pricing = ref([
            { name:'Рамочная стандарт', size:'1,0×1,2 мм', price:1000 },
            { name:'Рамочная на плунжерах', size:'1,0×1,2 мм', price:2500 },
            { name:'Балконная сетка Provedal', size:'1,0×1,2 мм', price:2300 },
            { name:'Рулонная на окно', size:'1,0×1,2 мм', price:3150 },
            { name:'Рулонная на дверь', size:'1,0×1,2 мм', price:3570 },
            { name:'Плиссе ("гармошка")', size:'1,0×1,2 мм', price:4000 },
            { name:'Распашная москитная дверь', size:'профиль 47×17', price:3570 }
        ]);

        const productionPhotos = ref([
            { src: 'images/13.png', alt: '', caption: '' },
            { src: 'images/14.png', alt: '', caption: '' },
            { src: 'images/15.png', alt: '', caption: '' },
            { src: 'images/16.png', alt: '', caption: '' },
            { src: 'images/17.png', alt: '', caption: '' },
            { src: 'images/18.png', alt: '', caption: '' },
            { src: 'images/19.png', alt: '', caption: '' },
            { src: 'images/20.png', alt: '', caption: '' },
            { src: 'images/21.png', alt: '', caption: '' },
            { src: 'images/22.png', alt: '', caption: '' },
            { src: 'images/23.png', alt: '', caption: '' },
            { src: 'images/24.png', alt: '', caption: '' }
        ]);

        const reviews = ref([
            { author:'Мария С.', source:'Google Карты', text:'Долго искали установщика плиссе-сеток с собственным производством. У Окнополис действительно есть своё производство и оно на высоком уровне!', rating:5 },
            { author:'Ольга С.', source:'Яндекс Карты', text:'Заказывала москитные сетки на окно и балкон. К замеру подошли ответственно, установку сделали на следующий день. Рекомендую!', rating:5 },
            { author:'Катерина Н.', source:'2ГИС', text:'Отличная и быстрая работа! Позвонила заказать сетку «антикошка». Замер в тот же день, на следующий — уже всё установлено.', rating:5 }
        ]);

        const faq = ref([
            { q:'Занимаетесь ли Вы ремонтом москитных сеток?', a:'Да, мы можем: заменить полотно, ручки, соединительные уголки или крепления. Минимальный выезд на ремонт от 3 сеток – 2000 руб.' },
            { q:'Какую гарантию Вы предоставляете?', a:'В зависимости от изделия гарантия составляет от 1 до 3 лет.' },
            { q:'Почему у вас недорого?', a:'Собственное производство, скидки, индивидуальная ценовая политика и долгосрочное сотрудничество с поставщиками.' }
        ]);

        const social = ref({
            whatsapp: 'https://max.ru/u/f9LHodD0cOKRqJXnvxucdw7pEuC85CBcxD-qbqr5VatFzadpXoybBugLjhw',
            telegram: 'https://t.me/oknopolis'
        });

        const menuOpen = ref(false);
        const showCallbackModal = ref(false);
        const openFaq = ref(null);
        const calculatorSection = ref(null);
        const isSubmitting = ref(false);

        const form = ref({
            type: config.value.types[0].name,
            color: 'white',
            width: 1000,
            height: 1500,
            quantity: 1,
            mesh: config.value.meshes[0].name,
            services: []
        });

        const cart = ref([]);
        const callbackPhone = ref('');
        const modalPhone = ref('');
        const modalComment = ref('');

        const calculatedPrice = computed(() => {
            if (!form.value.width || !form.value.height) return 0;
            const area = (form.value.width * form.value.height) / 1000000;
            const type = config.value.types.find(t => t.name === form.value.type);
            const typePrice = type ? type.price : 1000;
            const color = config.value.colors.find(c => c.value === form.value.color);
            const colorModifier = color ? color.priceModifier : 0;
            const mesh = config.value.meshes.find(m => m.name === form.value.mesh);
            const meshPrice = mesh ? mesh.price : 0;
            const servicesPrice = form.value.services.reduce((sum, s) => sum + s.price, 0);
            return Math.round((typePrice + colorModifier + meshPrice) * area * form.value.quantity + servicesPrice);
        });

        const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0));

        const scrollToCalculator = async () => {
            menuOpen.value = false;
            await nextTick();
            calculatorSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        const toggleFaq = (index) => {
            openFaq.value = openFaq.value === index ? null : index;
        };

        const addToCart = () => {
            if (calculatedPrice.value <= 0) return;
            const item = {
                name: `${form.value.type} — ${form.value.mesh}`,
                price: calculatedPrice.value,
                params: { ...form.value }
            };
            cart.value.push(item);
            const btn = event?.target;
            if (btn) {
                btn.textContent = '✅ Добавлено!';
                setTimeout(() => btn.textContent = '🛒 Добавить в корзину', 1500);
            }
        };

        const quickOrder = (itemName) => {
            modalComment.value = `Интересует: ${itemName}`;
            showCallbackModal.value = true;
        };

        const submitCallback = async () => {
            if (!callbackPhone.value) return;
            isSubmitting.value = true;

            const formData = new FormData();
            formData.append('action', 'send_callback');
            formData.append('phone', callbackPhone.value);
            formData.append('comment', '');
            formData.append('source', 'Форма "Перезвоните мне"');

            try {
                const response = await fetch('php/telegram.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    alert('✅ Спасибо! Мы перезвоним в ближайшее время.');
                    callbackPhone.value = '';
                } else {
                    alert('⚠️ Произошла ошибка. Попробуйте позже.');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('⚠️ Произошла ошибка. Попробуйте позже.');
            } finally {
                isSubmitting.value = false;
            }
        };

        const submitModalCallback = async () => {
            if (!modalPhone.value) return;
            isSubmitting.value = true;

            const formData = new FormData();
            formData.append('action', 'send_callback');
            formData.append('phone', modalPhone.value);
            formData.append('comment', modalComment.value);
            formData.append('source', 'Модальное окно "Заказать звонок"');

            try {
                const response = await fetch('php/telegram.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    alert(`✅ Заявка принята!\n📱 Телефон: ${modalPhone.value}`);
                    modalPhone.value = '';
                    modalComment.value = '';
                    showCallbackModal.value = false;
                } else {
                    alert('⚠️ Произошла ошибка. Попробуйте позже.');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('⚠️ Произошла ошибка. Попробуйте позже.');
            } finally {
                isSubmitting.value = false;
            }
        };

        onMounted(() => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href.length > 1) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            });
            document.addEventListener('click', (e) => {
                if (menuOpen.value && !e.target.closest('.header-nav')) {
                    menuOpen.value = false;
                }
            });
        });

        return {
            contact, promo, conditions, paymentMethods, config,
            constructions, meshTypes, pricing, productionPhotos, reviews, faq, social,
            menuOpen, showCallbackModal, openFaq, calculatorSection, isSubmitting,
            form, cart, callbackPhone, modalPhone, modalComment,
            calculatedPrice, cartTotal,
            scrollToCalculator, toggleFaq, addToCart, quickOrder,
            submitCallback, submitModalCallback
        };
    }
});

app.mount('#app');