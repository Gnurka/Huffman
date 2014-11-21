// Huffman coding with Underscore.js

// TODO: Add unit testing 
// Add some more logic, like showing entropy, bits per character, compression rate etc... to practice Underscore more.
// Separate logic and presentation
// Style with html, css and make a modern presentation
// Add some animations just for fun! :)

$(document).ready(function() {
	$("#generate").on("click", function() {
		console.log("CLICK!");
		var text = $("#input").val();
		console.log(text);
		var huffmanTable = huffman(text);

		var table = $("#result");
		table.show();
		table.find("tbody").empty();
		_.each(huffmanTable, function(i) {
			var row = $(
					"<tr>" +
						"<td>" + i.key + "</td>" +
						"<td>" + i.num + "</td>" +
						"<td>" + i.code + "</td>" +
					"</tr>");
			table.append(row);
		});

		var avgBits = getAvgBitCount(huffmanTable);
		console.log("Average bits per character: " + avgBits);
		$("#avgBits").text("Average bits per character: " + avgBits);
	});
});


function huffman(text) {

	console.log(text);

	var frequencies = _.countBy(text, function (ch) {
		return ch;
	});

	var leafs = _.map(frequencies, function (num, key) {
		return {num: num, key: key};
	});

	var queue = _.sortBy(leafs, function (i) {
		return i.num;
	});

	console.log(frequencies);
	console.log(queue);

	while (queue.length > 1) {
		var node0 = poll(queue)[0];
		var node1 = poll(queue)[0];
		var internalNode = makeNode(node0, node1);
		add(queue, internalNode);
	}

	console.log(queue);
	console.log(leafs);

	_.each(leafs, function(e) {
		e.code = generateCode(e, "");
		console.log(e.key + ": " + e.code);
	});

	return leafs;
}

function add(queue, num) {
    queue.splice(_.sortedIndex(queue, num, "num"), 0, num);
}

function poll(queue) {
    return queue.splice(0, 1);
}

function makeNode(node0, node1) {
	var sum = node0.num + node1.num;
	var parent = {num: sum, child0: node0, child1: node1};
	node0.parent = parent;
	node1.parent = parent;
	return parent;
}

function generateCode(node, code) {
	if (node.parent) {
		code += generateCode(node.parent, code);

		if (node === node.parent.child0) {
			code += 0;
		} else {
			code += 1;
		}
	}

	return code;
}

function getAvgBitCount(leafs) {
	return _.reduce(leafs, function(memo, leaf) {
		return memo + leaf.code.length / leafs.length;
	}, 0);
}