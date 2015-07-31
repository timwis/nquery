var should = require('should');
var Parser = require('../../index');

function inspect(obj) {
  console.log(require('util').inspect(obj, false, 10, true));
}

describe('where test',function(){

  it('expression', function() {
    var ast = Parser.parse('$where=magnitude > 3.0');
    //inspect(ast);

    ast.where.operator.should.eql('>')
    ast.where.left.column.should.eql('magnitude')
    ast.where.right.value.should.eql(3)
  });

  it('and, or', function() {
    var ast = Parser.parse('$where=magnitude > 3.0 and source = \'pr\'');
    //inspect(ast);

    ast.where.operator.should.eql('AND')
    ast.where.left.operator.should.eql('>')
    ast.where.left.left.column.should.eql('magnitude')
    ast.where.right.operator.should.eql('=')
  });

  it('within_box', function() {
    var ast = Parser.parse('$where=within_box(incident_location, 47.5998951, -122.33707, 47.5942794, -122.3270522)');
    //inspect(ast);

    ast.where.type.should.eql('function')
    ast.where.name.should.eql('within_box')
    ast.where.args.value.length.should.eql(5)
    ast.where.args.value[0].column.should.eql('incident_location')
  });

  it('between', function() {
    var ast = Parser.parse('$where=date between \'2015-01-10T12:00:00\' and \'2015-01-10T14:00:00\'')
    //inspect(ast);

    ast.where.left.column.should.eql('date')
    ast.where.right.value.length.should.eql(2)
    ast.where.right.value[1].value.should.eql('2015-01-10T14:00:00')
  });

  /*it('not between', function() {
    var ast = Parser.parse('$where=salary not between \'40000\' and \'150000\'')
    inspect(ast);
  });*/

  it('within_polygon', function() {
    var ast = Parser.parse('$where=within_polygon(location, \'MULTIPOLYGON (((-87.637714 41.887275, -87.613681 41.886892, -87.625526 41.871555, -87.637714 41.887275)))\')')
    inspect(ast);
  })

});
