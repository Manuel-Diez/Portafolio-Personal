package com.estante.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estante.Entity.Book;
import com.estante.Entity.Loan;
import com.estante.Entity.Penalty;
import com.estante.IRepository.IBookRepository;
import com.estante.IRepository.ILoanRepository;
import com.estante.IRepository.IPenaltyRepository;

@Service
public class LoanService extends ObjectTServices<Loan> {

	private static final double DAILY_FINE_RATE = 1000.0;

	@Autowired
	private ILoanRepository loanRepository;

	@Autowired
	private IBookRepository bookRepository;

	@Autowired
	private IPenaltyRepository penaltyRepository;

	@Override
	public Loan save(Loan loan) throws Exception {
		Book book = bookRepository.findById(loan.getBook().getId())
				.orElseThrow(() -> new Exception("No se encontró el libro especificado."));

		if (book.getStock() <= 0) {
			throw new Exception("No hay ejemplares disponibles de \"" + book.getQualification() + "\".");
		}

		book.setStock(book.getStock() - 1);
		book.setBorrowedBooks(book.getBorrowedBooks() + 1);
		bookRepository.save(book);

		if (loan.getStatus() == null) {
			loan.setStatus(Loan.status.borrowed);
		}

		return loanRepository.save(loan);
	}

	@Override
	public Loan update(Loan loanDetails, Long id) throws Exception {
		Loan existente = loanRepository.findById(id)
				.orElseThrow(() -> new Exception("No se encontró el préstamo."));

		Loan.status estadoAnterior = existente.getStatus();
		Loan.status estadoNuevo = loanDetails.getStatus() != null ? loanDetails.getStatus() : estadoAnterior;

		boolean seEstaCerrando = estadoAnterior == Loan.status.borrowed
				&& (estadoNuevo == Loan.status.delivered || estadoNuevo == Loan.status.cancell);

		if (seEstaCerrando) {
			devolverStock(existente);

			if (estadoNuevo == Loan.status.delivered) {
				generarMultaSiHayAtraso(existente);
			}
		}

		return super.update(loanDetails, id);
	}

	private void devolverStock(Loan loan) {
		Book book = loan.getBook();
		book.setStock(book.getStock() + 1);
		book.setBorrowedBooks(Math.max(0, book.getBorrowedBooks() - 1));
		bookRepository.save(book);
	}

	private void generarMultaSiHayAtraso(Loan loan) {
		LocalDate fechaLimite = loan.getDevolutionDate();
		LocalDate hoy = LocalDate.now();

		if (fechaLimite == null || !hoy.isAfter(fechaLimite)) {
			return;
		}

		long diasAtraso = ChronoUnit.DAYS.between(fechaLimite, hoy);

		Penalty penalty = new Penalty();
		penalty.setUser(loan.getUser());
		penalty.setLoan(loan);
		penalty.setFineAmount(diasAtraso * DAILY_FINE_RATE);
		penalty.setFineDate(hoy);
		penalty.setStatus(true);

		penaltyRepository.save(penalty);
	}
}
