package br.ufrn.autopoc.dao;

import br.ufrn.autopoc.model.Bomba;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:9595")
public interface BombaRepository extends JpaRepository<Bomba, Long> {
}
