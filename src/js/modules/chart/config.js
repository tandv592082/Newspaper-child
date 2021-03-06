
// <block:config:0>
import Utils from './utils';
import { possitiveColor, negativeColor } from './const';

const data = (items) => {
    // console.log(items);
    const precision = 100; // 2 decimals
    const result = items.map((item) => {
        const randomnum = Math.floor(Math.random() * (10 * precision - -4 * precision) - 4 * precision) / (1 * precision);
        const date = Utils.filterDate(item['Ngày']);
        // console.log(typeofitem['Ngày'].replace('', ''));
        // console.log(date);
        // const value = Utils.filterNumber(item['Mua/Bán(tấn)']);
        const value = { y: randomnum };
        // console.log(randomnum);
        return Object.assign(date, value);
    });
    return result;
};

const vi = [{
    name: 'vi',
    options: {
        months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
            'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        shortMonths: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7',
            'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
        days: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        shortDays: ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'],
        toolbar: {
            download: 'Tải ảnh',
            selection: 'Selection',
            selectionZoom: 'Selection Zoom',
            zoomIn: 'Zoom In',
            zoomOut: 'Zoom Out',
            pan: 'Panning',
            reset: 'Reset Zoom',
        }
    }
}];

const configs = (items, setting) => {
    let finalData = data(items);
    const { length } = finalData;

    finalData = (length > 20 && setting.hasSliced) ? finalData.slice(length - 20, length) : finalData;

    const values = finalData.map(value => value.y);
    // console.log(values);
    // console.log(finalData);
    const max = Math.ceil(Math.max(...values) + setting.num);
    const min = Math.ceil(Math.min(...values) - setting.num);
    // console.log(`${max} + ${min}`);
    return {
        // eslint-disable-next-line no-unused-vars
        colors: [({ value, seriesIndex, w }) => (value <= 0 ? negativeColor : possitiveColor)],
        chart: {
            defaultLocale: 'vi',
            redrawOnParentResize: true,
            locales: vi,
            height: 380,
            width: '100%',
            toolbar: { show: true },
            zoom: {
                enabled: true,
                type: 'x',
            },
            type: `${setting.type}`,
            animations: {
                initialAnimation: {
                    enabled: false
                }
            },
            events: {
                // zoomed(chartContext, config) {
                //     // eslint-disable-next-line no-param-reassign
                //     // dataLabels.enabled = true;
                //     console.log(config.config);
                //     console.log(config.config.series[config.seriesIndex].name);
                //     console.log(config.config.series[config.seriesIndex].data[config.dataPointIndex]);
                // }
                updated(chartContext, config) {
                    config.config.dataLabels.enabled = true;
                    // console.log(config.config);
                    console.log(config.config.series[0].data);
                }
            }

        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '80%',
                dataLabels: {
                    enabled: false,
                    position: 'top', // top, center, bottom
                },
            }
        },
        title: {
            // text: 'Lượng vàng mua vào/bán ra của quỹ SPDR (Đơn vị: Tấn)',
            text: `${setting.title}`,
            align: 'center',
            floating: true
        },
        dataLabels: {
            enabled: length <= 20,
            enabledOnSeries: true,
            formatter(val) {
                return setting.unit ? `${val}${setting.unit}` : `${val}`;
            },
            offsetY: -24,
            style: {
                fontSize: `${setting.fontSize}px`,
                fontWeight: 'bold',
                colors: ['#304758']
            }
        },
        series: [{
            name: `${setting.tooltipsTitle}`,
            data: finalData
        }],
        xaxis: {
            type: 'category',
            tickPlacement: 'on',
        },
        yaxis: {
            max, min
        }
    };
};

export default configs;
