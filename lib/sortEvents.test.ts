import { 
  splitAndSortEvents, 
  nearestUpcoming, 
  getSortedEvents, 
  getEventStatus,
  type Event 
} from './sortEvents';

/**
 * 測試用的模擬活動資料
 * 包含跨月、跨年的情境測試
 */
function createTestEvents(): Event[] {
  const now = new Date('2025-09-24T10:00:00+08:00'); // 模擬目前時間
  
  return [
    // 未來活動
    {
      id: 'event-1',
      title: '今天+1天的活動',
      date: '2025-09-25',
      time: '14:00',
      duration: 2
    },
    {
      id: 'event-2', 
      title: '今天+3天的活動',
      date: '2025-09-27',
      time: '10:00',
      duration: 3
    },
    {
      id: 'event-3',
      title: '今天+10天的活動（跨月）',
      date: '2025-10-04', 
      time: '16:00',
      duration: 2
    },
    {
      id: 'event-4',
      title: '明年的活動（跨年）',
      date: '2026-01-15',
      time: '09:00',
      duration: 4
    },
    // 過去活動
    {
      id: 'event-past-1',
      title: '昨天的活動',
      date: '2025-09-23',
      time: '15:00',
      duration: 2
    },
    {
      id: 'event-past-2',
      title: '一週前的活動',
      date: '2025-09-17',
      time: '13:00',
      duration: 3
    },
    {
      id: 'event-past-3',
      title: '上個月的活動（跨月）',
      date: '2025-08-20',
      time: '11:00',
      duration: 2
    },
    // 正在進行中的活動
    {
      id: 'event-ongoing',
      title: '正在進行的活動',
      date: '2025-09-24',
      time: '09:00',
      duration: 3 // 應該在 12:00 結束，現在 10:00 還在進行
    }
  ];
}

/**
 * 執行所有測試
 */
function runTests(): void {
  console.log('🧪 開始測試活動排序邏輯...\n');
  
  const testEvents = createTestEvents();
  const testTime = new Date('2025-09-24T10:00:00+08:00');
  
  // 測試 1: splitAndSortEvents
  console.log('📋 測試 1: splitAndSortEvents');
  const { upcoming, past } = splitAndSortEvents(testEvents, testTime);
  
  console.log('未來活動 (應依時間由近到遠):');
  upcoming.forEach((event, index) => {
    console.log(`  ${index + 1}. ${event.title} (${event.date} ${event.time})`);
  });
  
  console.log('\n過去活動 (應依時間由近到遠):');
  past.forEach((event, index) => {
    console.log(`  ${index + 1}. ${event.title} (${event.date} ${event.time})`);
  });
  
  // 測試 2: nearestUpcoming
  console.log('\n📋 測試 2: nearestUpcoming (限制 3 筆)');
  const nearest3 = nearestUpcoming(testEvents, 3, testTime);
  nearest3.forEach((event, index) => {
    console.log(`  ${index + 1}. ${event.title} (${event.date} ${event.time})`);
  });
  
  // 測試 3: getSortedEvents
  console.log('\n📋 測試 3: getSortedEvents (未來活動 + 2 筆過去活動)');
  const sorted = getSortedEvents(testEvents, undefined, 2, testTime);
  sorted.forEach((event, index) => {
    const status = getEventStatus(event, testTime);
    console.log(`  ${index + 1}. ${event.title} (${event.date} ${event.time}) [${status}]`);
  });
  
  // 測試 4: 活動狀態測試
  console.log('\n📋 測試 4: 活動狀態檢查');
  testEvents.forEach(event => {
    const status = getEventStatus(event, testTime);
    console.log(`  ${event.title}: ${status}`);
  });
  
  // 驗收標準測試
  console.log('\n✅ 驗收標準測試:');
  console.log('當今天是 2025-09-24，若有活動:');
  console.log('- A(今天+1天): 2025-09-25');
  console.log('- B(今天+3天): 2025-09-27');  
  console.log('- C(今天+10天): 2025-10-04');
  console.log('- D(已過去): 2025-09-23');
  
  const acceptanceCriteria = nearestUpcoming(testEvents, 10, testTime);
  const upcomingOnly = acceptanceCriteria.filter(event => {
    const status = getEventStatus(event, testTime);
    return status === 'upcoming' || status === 'ongoing';
  });
  
  console.log('\n「最近活動」應依序顯示:');
  upcomingOnly.slice(0, 3).forEach((event, index) => {
    console.log(`  ${index + 1}. ${event.title} (${event.date})`);
  });
  
  console.log('\n🎉 測試完成！');
}

// 如果直接執行此檔案則運行測試
if (typeof window === 'undefined') {
  runTests();
}

export { runTests, createTestEvents };