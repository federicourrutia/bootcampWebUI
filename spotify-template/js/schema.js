let artists = [
	{
		id: 1,
		name: 'Metallica'
	},
	{
		id: 2,
		name: 'Red Hot Chilli Peppers'
	}
]

let albums = [
	{
		id: 1,
		name: 'Black',
		artists: [1],
		songs: [1]
	},{
		id: 2,
		name: 'Dark necessities',
		artists: [1],
		songs: [2]
	}
];

let songs = [
	{
		id:1,
		name: 'A song',
		artists: [1, 2],
		albums: [1],
		genreId: 1,
		duration: '3:21',
	},{
		id:1,
		name: 'Blacks',
		artists: [1, 2],
		albums: [2],
		genreId: 1,
		duration: '32:21',
	}

]

let genres = [
	{
		id:1,
		name:'Rock'
	}
];

let playLists = [
	{
		id: 1,
		name: 'Chill',
		description: 'Songs to chill down',
		image: 'https://cloudfront.dappered.com/wp-content/uploads/2016/08/Playlist_Header_large_posterized.jpg',
		songs: [1,2]
	}
];