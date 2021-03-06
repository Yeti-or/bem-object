/* global describe, it */

require('should');
var object = require('..');

describe('object', function () {
    it('should construct path by default', function () {
        object('level/block__elem_mod_val.js')
        .path.should.eql('level/block__elem_mod_val.js');
    });

    it('should throw, when path does not have extension', function () {
        (function() { object('level/block__elem_mod_val'); }).should.throw();
    });

    it('should support creating from string', function () {
        var bem = object('level/block__elem_mod_val.deps.js');

        bem.should.have.property('level', 'level');
        bem.should.have.property('block', 'block');
        bem.should.have.property('elem', 'elem');
        bem.should.have.property('modName', 'mod');
        bem.should.have.property('modVal', 'val');
        bem.should.have.property('tech', 'deps.js');
    });

    it('should support creating from object', function () {
        var bem = object({
            level: 'level',
            block: 'block',
            elem: 'elem',
            modName: 'mod',
            modVal: 'val',
            tech: 'js'
        });

        bem.should.have.property('level', 'level');
        bem.should.have.property('block', 'block');
        bem.should.have.property('elem', 'elem');
        bem.should.have.property('modName', 'mod');
        bem.should.have.property('modVal', 'val');
        bem.should.have.property('tech', 'js');
    });

    it('should have id and bem getters', function () {
        var bem = object('level/block__elem_mod_val.js');

        bem.id.should.eql('block__elem_mod_val');
        bem.bem.should.eql('block__elem_mod_val');
    });

    it('should support naming options', function () {
        var bem = object('level/block--elem-mod-val.js', {
            elem: '--',
            mod: '-'
        });

        bem.id.should.eql('block--elem-mod-val');
    });

    it('should throw when parsing fails', function () {
        (function () {
            object('level/block__elem_mod_val.js', {
                elem: '--',
                mod: '-'
            });
        }).should.throw(/Could not parse/);
    });

    it('should have copy method', function () {
        var result = object('level/block_mod.js').copy({elem: 'elem'});
        result.should.have.property('block', 'block');
        result.should.have.property('elem', 'elem');
        result.should.have.property('tech', 'js');
        result.should.not.have.property('modName', 'mod');
    });

    it('copy method should throw on invalid target', function () {
        (function () {
            object('level/block__elem_mod_val.js').copy('lol');
        }).should.throw(/Target object should be instance of Object/);
    });
});
