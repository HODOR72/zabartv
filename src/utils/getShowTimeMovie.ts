const getShowTimeMovie = (hours: number | undefined, minutes: number| undefined) => {
    const out_hours = new Intl.NumberFormat('ru-RU', {
        style: 'unit',
        unit: 'hour',
        unitDisplay: 'long'
    }).format(Number(hours))

    const out_minutes = new Intl.NumberFormat('ru-RU', {
        style: 'unit',
        unit: 'minute',
        unitDisplay: 'long'
    }).format(Number(minutes))

    return hours !== 0 ? `${out_hours} ${out_minutes}` : `${out_minutes}`
}

export default getShowTimeMovie
